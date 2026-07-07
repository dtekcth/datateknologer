import { onBeforeUnmount } from "vue";

/* centre-out card deal, reversible: when a grid scrolls into view its
 * middle card fades in already at the row centre, just slightly
 * enlarged, and settles to size — then the rest slide outward from
 * underneath it, nearest ring first. an odd row has one centre card;
 * an even row settles its two middle cards overlapped as one and the
 * pair divides. rows of a wrapped grid repeat a beat later. scrolling
 * back out plays the whole thing backwards (cards gather under the
 * centre card, outermost first and bottom row first, then it swells
 * and fades away), and it replays on re-entry.
 *
 * built on transitions (not keyframes) so a direction change mid-
 * flight simply turns around. this file only measures and toggles
 * classes; the transition css lives with the grid markup (scoped css
 * can't reach into a composable).
 */

const SPREAD_MS = 620; // outward slide, must match the css
const STAMP_HIT_MS = 300; // how far into the centre card's settle the divide starts
const STEP_MS = 90; // per-ring stagger of the slide
const ROW_MS = 300; // extra delay per grid row

export function useCardDeal() {
  const observers: IntersectionObserver[] = [];
  const seen = new WeakSet<Element>();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const measure = (grid: HTMLElement) => {
    const cards = Array.from(grid.children).filter(
      (c): c is HTMLElement => c instanceof HTMLElement,
    );

    /* group the cards into rows by their top edge */
    const tops: number[] = [];
    const rows: HTMLElement[][] = [];
    for (const c of cards) {
      let r = tops.findIndex((t) => Math.abs(t - c.offsetTop) < 8);
      if (r === -1) {
        r = tops.length;
        tops.push(c.offsetTop);
        rows.push([]);
      }
      rows[r].push(c);
    }

    rows.forEach((rowCards, row) => {
      const left = Math.min(...rowCards.map((c) => c.offsetLeft));
      const right = Math.max(
        ...rowCards.map((c) => c.offsetLeft + c.offsetWidth),
      );
      const centre = (left + right) / 2;

      /* dx = how far the card's slot sits from the row centre; rings are
         the distinct |dx| values sorted inward-out, so the middle card
         (or pair) is ring 0 and staggers grow with distance */
      const dxs = rowCards.map(
        (c) => centre - (c.offsetLeft + c.offsetWidth / 2),
      );
      const rings = [...new Set(dxs.map((d) => Math.round(Math.abs(d))))].sort(
        (a, b) => a - b,
      );
      const maxRing = rings.length - 1;

      const rowFwd = row * ROW_MS;
      const rowRev = (rows.length - 1 - row) * ROW_MS;
      /* the stamp lifts off once the row's outermost cards are back
         underneath it (single-card rows have nothing to wait for) */
      const rowLift =
        rowRev + (maxRing > 0 ? maxRing * STEP_MS + SPREAD_MS : 0) + 60;

      rowCards.forEach((c, i) => {
        const ring = rings.indexOf(Math.round(Math.abs(dxs[i])));
        c.style.setProperty("--dx", `${dxs[i]}px`);
        c.style.setProperty("--stamp-delay", `${rowFwd}ms`);
        c.style.setProperty(
          "--spread-delay",
          `${rowFwd + STAMP_HIT_MS + ring * STEP_MS}ms`,
        );
        c.style.setProperty(
          "--gather-delay",
          `${rowRev + (maxRing - ring) * STEP_MS}ms`,
        );
        c.style.setProperty(
          "--hide-delay",
          `${rowRev + (maxRing - ring) * STEP_MS + SPREAD_MS}ms`,
        );
        c.style.setProperty("--lift-delay", `${rowLift}ms`);
        c.classList.toggle("hit", ring === 0);
      });
    });
  };

  /* used as a template ref callback: <div class="event-grid" :ref="deal"> */
  const attach = (el: unknown) => {
    if (!(el instanceof HTMLElement) || seen.has(el) || reduce) return;
    seen.add(el);

    el.classList.add("deal-ready");
    let measured = false;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry.isIntersecting) {
          if (!measured) {
            measured = true;
            /* first trigger: commit the gathered state without letting
               the var assignment itself animate, then deal from there */
            el.classList.add("deal-lock");
            measure(el);
            void el.offsetHeight;
            el.classList.remove("deal-lock");
          }
          el.classList.add("dealt");
        } else {
          el.classList.remove("dealt");
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    observers.push(io);
  };

  onBeforeUnmount(() => observers.forEach((o) => o.disconnect()));

  return attach;
}
