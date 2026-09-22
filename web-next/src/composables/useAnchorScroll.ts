import { onBeforeUnmount, onMounted } from "vue";

/* js-driven anchor scrolling: the native smooth scroll can't be shaped,
 * so clicks on in-page # links animate the window manually with a hard
 * ease-out — most of the distance is covered straight away, then the
 * scroll decelerates heavily and glides into the target section. any
 * wheel/touch/key input hands control back to the user immediately;
 * reduced motion jumps instantly. installed once, app-wide.
 */

/* exponential ease-out, normalised so p=1 lands exactly on 1 */
const N = 1 - Math.pow(2, -10);
const easeOutExpo = (p: number) =>
  p >= 1 ? 1 : (1 - Math.pow(2, -10 * p)) / N;

export function useAnchorScroll() {
  let raf = 0;
  let cancels: (() => void)[] = [];

  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    cancels.forEach((c) => c());
    cancels = [];
  };

  const animateTo = (target: HTMLElement) => {
    stop();
    /* wait a frame so an overlay that just closed (the menu) releases
       its body scroll lock before we measure and start moving */
    raf = requestAnimationFrame(() => {
      const startY = window.scrollY;
      const targetY = Math.min(
        target.getBoundingClientRect().top + startY,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const dist = targetY - startY;
      if (Math.abs(dist) < 2) return;

      /* longer hops get a bit more time, within reason */
      const dur = Math.min(1600, Math.max(900, 700 + Math.abs(dist) * 0.35));

      const takeOver = () => stop();
      window.addEventListener("wheel", takeOver, { passive: true });
      window.addEventListener("touchstart", takeOver, { passive: true });
      window.addEventListener("keydown", takeOver);
      cancels.push(
        () => window.removeEventListener("wheel", takeOver),
        () => window.removeEventListener("touchstart", takeOver),
        () => window.removeEventListener("keydown", takeOver),
      );

      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        window.scrollTo({
          top: startY + dist * easeOutExpo(p),
          /* bypasses the css scroll-behavior: smooth */
          behavior: "instant",
        });
        if (p < 1) {
          raf = requestAnimationFrame(step);
        } else {
          stop();
        }
      };
      raf = requestAnimationFrame(step);
    });
  };

  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    if (!(e.target instanceof Element)) return;
    const link = e.target.closest('a[href^="#"]');
    const id = link?.getAttribute("href")?.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return; // dead anchor — leave the default behaviour

    e.preventDefault();
    /* keep the hash in the url without the browser's own jump */
    history.pushState(null, "", `#${id}`);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.scrollIntoView({ behavior: "instant" });
      return;
    }
    animateTo(target);
  };

  onMounted(() => document.addEventListener("click", onClick));
  onBeforeUnmount(() => {
    document.removeEventListener("click", onClick);
    stop();
  });
}
