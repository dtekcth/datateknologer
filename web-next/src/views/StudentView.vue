<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from "vue";
import { useLocale } from "@/composables/useLocale";
import { introPhase } from "@/composables/useIntro";
import { fetchEvents, type ApiEvent } from "@/api/events";
import { useCardDeal } from "@/composables/useCardDeal";
import AboutDag from "@/components/AboutDag.vue";
import GetInvolved from "@/components/GetInvolved.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import EventCard from "@/components/EventCard.vue";
import EventModal from "@/components/EventModal.vue";
import PastEventsModal from "@/components/PastEventsModal.vue";
import RevealTitle from "@/components/RevealTitle.vue";
import logoUrl from "@/assets/logo-full-dark.svg";
import handsUrl from "@/assets/jsp-dither.webp";
import flowersUrl from "@/assets/flowers-dither.webp";
import treeUrl from "@/assets/tree-dither.webp";
import tree2Url from "@/assets/tree2_dither.webp";

const { lang, otherLang } = useLocale();

/* ============ Events ============ */
const events = ref<ApiEvent[] | null>(null);
const eventsFailed = ref(false);

const loadEvents = async () => {
  eventsFailed.value = false;
  events.value = null;
  try {
    events.value = await fetchEvents();
  } catch {
    eventsFailed.value = true;
  }
};

onMounted(loadEvents);

const eventsPending = computed(() => events.value === null && !eventsFailed.value);

/* scroll-triggered centre-out deal for the event grids */
const dealGrid = useCardDeal();

/* the background trees grow in when their part of the section
   scrolls into view and reverse on the way out (like the rest) */
const treeEl = ref<HTMLElement | null>(null);
const tree2El = ref<HTMLElement | null>(null);
const treeShown = ref(false);
const tree2Shown = ref(false);
const artObservers: IntersectionObserver[] = [];

const revealOnScroll = (el: HTMLElement | null, flag: Ref<boolean>) => {
  if (!el) return;
  const io = new IntersectionObserver(
    (entries) => {
      flag.value = entries[entries.length - 1].isIntersecting;
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.06 },
  );
  io.observe(el);
  artObservers.push(io);
};

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    treeShown.value = true;
    tree2Shown.value = true;
    return;
  }
  revealOnScroll(treeEl.value, treeShown);
  revealOnScroll(tree2El.value, tree2Shown);
});

onBeforeUnmount(() => artObservers.forEach((o) => o.disconnect()));

/* /events comes back date-ascending; split on now */
const upcoming = computed(() =>
  (events.value ?? []).filter((e) => new Date(e.date).getTime() >= Date.now()),
);
const past = computed(() =>
  (events.value ?? [])
    .filter((e) => new Date(e.date).getTime() < Date.now())
    .reverse(),
);

/* the grid previews the most recent past events; the rest live in a
   scrollable dialog behind the "view all" button. when there are no
   upcoming events the archive would otherwise be the only content and
   dominate the section, so we preview fewer and lean on "view all". */
const PAST_PREVIEW = 4;
const pastVisible = computed(() =>
  past.value.slice(0, upcoming.value.length === 0 ? 2 : PAST_PREVIEW),
);
const allPastOpen = ref(false);

/* card → detail dialog (with registration when the event is upcoming) */
const selected = ref<{ event: ApiEvent; past: boolean } | null>(null);

/* entrance stays paused until the intro logo has flown into the nav */
const introWait = computed(
  () => introPhase.value === "hold" || introPhase.value === "morph",
);

const menuOpen = ref(false);

/* overlays hide the page but don't remove it from the scroll flow */
watch([menuOpen, selected, allPastOpen], ([menu, sel, all]) => {
  document.body.style.overflow = menu || sel || all ? "hidden" : "";
});

/* innermost overlay first; the detail dialog handles its own Escape
   (this listener registers earlier, so it sees `selected` still set) */
const onKeydown = (e: KeyboardEvent) => {
  if (e.key !== "Escape") return;
  if (selected.value) return;
  if (allPastOpen.value) {
    allPastOpen.value = false;
    return;
  }
  menuOpen.value = false;
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});

const copy = computed(() =>
  lang.value === "sv"
    ? {
        menuLabel: "Meny",
        menuCloseLabel: "Stäng",
        menuEvents: "Event",
        menuAbout: "Om DAG",
        menuJoin: "Delta",
        menuCompany: "Företag",
        eyebrow: "För dig som pluggar Datateknik på Chalmers",
        headline: "Din karriär börjar här.",
        lead: "Lunchföreläsningar, casekvällar och studiebesök — möt dina framtida arbetsgivare redan under studietiden.",
        locationLabel: "Plats",
        locationLine1: "Chalmers tekniska högskola",
        locationLine2: "Göteborg",
        ctaEvents: "Visa event",
        upcomingTitle: "Kommande event",
        pastTitle: "Tidigare event",
        eventsLoading: "Laddar event …",
        eventsError: "Kunde inte hämta eventen.",
        eventsRetry: "Försök igen",
        noUpcoming: "Inga inplanerade event just nu — titta in snart igen.",
        viewAllPast: "Visa alla tidigare event",
      }
    : {
        menuLabel: "Menu",
        menuCloseLabel: "Close",
        menuEvents: "Events",
        menuAbout: "About DAG",
        menuJoin: "Get involved",
        menuCompany: "For companies",
        eyebrow: "For CSE students at Chalmers",
        headline: "Your career starts here.",
        lead: "Lunch lectures, case evenings and study visits — meet your future employers while you study.",
        locationLabel: "Location",
        locationLine1: "Chalmers University of Technology",
        locationLine2: "Gothenburg",
        ctaEvents: "View events",
        upcomingTitle: "Upcoming events",
        pastTitle: "Past events",
        eventsLoading: "Loading events …",
        eventsError: "Couldn't load the events.",
        eventsRetry: "Try again",
        noUpcoming: "No scheduled events right now — check back soon.",
        viewAllPast: "View all past events",
      },
);
</script>

<template>
  <div class="student">
  <div class="hero" :class="{ 'intro-wait': introWait }">
    <header class="nav">
      <nav class="nav-left">
        <button
          class="menu-button"
          :aria-label="copy.menuLabel"
          @click="menuOpen = true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M3 9h18" />
            <path d="M3 15h11" />
          </svg>
          <span>{{ copy.menuLabel }}</span>
        </button>
      </nav>

      <img class="logo" data-hero-logo :src="logoUrl" alt="DAG" />

      <div class="nav-right">
        <RouterLink class="lang-toggle" :to="{ params: { lang: otherLang } }">
          {{ otherLang.toUpperCase() }}
        </RouterLink>
      </div>
    </header>

    <!-- ============ Full-screen menu ============ -->
    <div v-if="menuOpen" class="menu-overlay">
      <img class="menu-flower" :src="flowersUrl" alt="" />

      <div class="menu-header">
        <button
          class="menu-button"
          :aria-label="copy.menuCloseLabel"
          @click="menuOpen = false"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
          </svg>
          <span>{{ copy.menuCloseLabel }}</span>
        </button>
        <img class="logo" :src="logoUrl" alt="DAG" />
        <RouterLink
          class="lang-toggle"
          :to="{ params: { lang: otherLang } }"
        >
          {{ otherLang.toUpperCase() }}
        </RouterLink>
      </div>

      <nav class="menu-nav">
        <a class="menu-link" href="#event" @click="menuOpen = false">
          {{ copy.menuEvents }}
        </a>
        <a class="menu-link" href="#om" @click="menuOpen = false">
          {{ copy.menuAbout }}
        </a>
        <a class="menu-link" href="#delta" @click="menuOpen = false">
          {{ copy.menuJoin }}
        </a>
        <RouterLink
          class="menu-link"
          :to="{ name: 'company', params: { lang } }"
        >
          {{ copy.menuCompany }}
        </RouterLink>
      </nav>
    </div>

    <div class="meta">
      <div class="location">
        <span class="location-label">{{ copy.locationLabel }}</span>
        <p>{{ copy.locationLine1 }}<br />{{ copy.locationLine2 }}</p>
      </div>
    </div>

    <main class="stage">
      <div class="hands" aria-hidden="true">
        <img :src="handsUrl" alt="" />
      </div>

      <div class="content">
        <span class="eyebrow">{{ copy.eyebrow }}</span>
        <h1 class="headline">{{ copy.headline }}</h1>
        <p class="lead">{{ copy.lead }}</p>

        <div class="ctas">
          <a class="cta" href="#event">
            {{ copy.ctaEvents }}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  </div>

  <!-- ============ Events ============ -->
  <section
    id="event"
    class="events"
    :class="{ 'no-upcoming': !eventsPending && !eventsFailed && upcoming.length === 0 }"
  >
    <div ref="treeEl" class="events-tree" :class="{ shown: treeShown }">
      <img :src="treeUrl" alt="" aria-hidden="true" loading="lazy" decoding="async" />
    </div>
    <!-- the second tree only belongs beside the past-events archive, so
         with no past events just the one (right) tree is shown -->
    <div
      v-show="past.length"
      ref="tree2El"
      class="events-tree2"
      :class="{ shown: tree2Shown }"
    >
      <img :src="tree2Url" alt="" aria-hidden="true" loading="lazy" decoding="async" />
    </div>
    <RevealTitle class="events-title" :text="copy.upcomingTitle" />

    <p v-if="eventsPending" class="events-note">{{ copy.eventsLoading }}</p>

    <template v-else-if="eventsFailed">
      <p class="events-note">{{ copy.eventsError }}</p>
      <button class="events-retry" @click="loadEvents">
        {{ copy.eventsRetry }}
      </button>
    </template>

    <template v-else>
      <template v-if="upcoming.length === 0">
        <p class="events-note">{{ copy.noUpcoming }}</p>
      </template>
      <div v-else class="event-grid" :ref="dealGrid">
        <div v-for="e in upcoming" :key="e.id" class="deal">
          <div class="deal-inner">
            <EventCard
              :event="e"
              @open="selected = { event: e, past: false }"
            />
          </div>
        </div>
      </div>

      <template v-if="past.length">
        <RevealTitle
          class="events-title events-title-past"
          :text="copy.pastTitle"
        />
        <div class="event-grid" :ref="dealGrid">
          <div v-for="e in pastVisible" :key="e.id" class="deal">
            <div class="deal-inner">
              <EventCard
                :event="e"
                past
                @open="selected = { event: e, past: true }"
              />
            </div>
          </div>
        </div>

        <button
          v-if="past.length > pastVisible.length"
          class="events-more"
          @click="allPastOpen = true"
        >
          {{ copy.viewAllPast }}
        </button>
      </template>
    </template>
  </section>

  <!-- ============ About DAG ============ -->
  <AboutDag />

  <!-- ============ Get involved ============ -->
  <GetInvolved />

  <!-- ============ Footer ============ -->
  <SiteFooter />

  <PastEventsModal
    v-if="allPastOpen"
    :events="past"
    @close="allPastOpen = false"
    @select="selected = { event: $event, past: true }"
  />

  <EventModal
    v-if="selected"
    :key="selected.event.id"
    :event="selected.event"
    :past="selected.past"
    @close="selected = null"
  />
  </div>
</template>

<style scoped>
/* clip full-bleed decorations (events trees) at the real screen
   edge and keep the page from scrolling sideways */
.student {
  overflow-x: clip;
}

.hero {
  min-height: 100vh;
  min-height: 100svh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-mono);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* ============ Nav ============ */
.nav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 26px 48px;
  position: relative;
  z-index: 3;
  animation: fade-in 700ms var(--ease-out-expo) both;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-button {
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.menu-button:hover {
  color: var(--orange);
}

.logo {
  height: 58px;
  width: auto;
}

.nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.lang-toggle {
  text-decoration: none;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.lang-toggle:hover {
  color: var(--orange-bright);
}

/* ============ Full-screen menu ============ */
.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 5;
  background: var(--paper);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: menu-fade 260ms var(--ease-out) both;
}

.menu-flower {
  position: absolute;
  right: -40px;
  bottom: -40px;
  width: auto;
  height: min(78vh, 720px);
  pointer-events: none;
  opacity: 0.95;
  z-index: 3;
  transform-origin: bottom center;
  animation: menu-grow 1100ms cubic-bezier(0.12, 0.9, 0.2, 1) 120ms both;
}

.menu-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 26px 48px;
  position: relative;
  z-index: 2;
}

.menu-header .menu-button {
  justify-self: start;
}

.menu-header .lang-toggle {
  justify-self: end;
}

.menu-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 48px;
  position: relative;
  z-index: 2;
}

.menu-link {
  text-decoration: none;
  color: var(--ink);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(44px, 8vw, 116px);
  line-height: 1;
  letter-spacing: -0.02em;
  padding: min(3.4vh, 34px) 0;
  display: block;
  background:
    linear-gradient(90deg, var(--ink) 55%, rgba(10, 10, 10, 0) 82%)
    bottom left / 100% 2px no-repeat;
  animation: menu-rise 520ms var(--ease-out) both;
}

.menu-link:hover {
  color: var(--orange);
}

.menu-link:nth-child(1) {
  animation-delay: 90ms;
}

.menu-link:nth-child(2) {
  animation-delay: 170ms;
}

.menu-link:nth-child(3) {
  animation-delay: 250ms;
}

.menu-link:nth-child(4) {
  animation-delay: 330ms;
}

/* ============ Corner meta ============ */
.meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 48px;
  padding: 20px 48px 0;
  position: relative;
  z-index: 2;
  animation: fade-in 700ms var(--ease-out-expo) 150ms both;
}

.location {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.location-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--orange);
}

.location p {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.7;
  color: var(--muted);
}

/* ============ Stage ============ */
.stage {
  flex: 1;
  position: relative;
  display: grid;
  place-items: start center;
  min-height: 0;
}

.hands {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  pointer-events: none;
  /* dissolve the building into the paper toward the bottom edge */
  -webkit-mask-image: linear-gradient(to bottom, #000 60%, transparent 97%);
  mask-image: linear-gradient(to bottom, #000 60%, transparent 97%);
  animation: hands-in 1800ms var(--ease-out-expo) 300ms both;
}

.hands img {
  width: 100%;
  height: auto;
  opacity: 0.28;
}

/* ============ Content ============ */
.content {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 24px 4px;
}

.eyebrow {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 14px;
  animation: rise-in 900ms var(--ease-out-expo) 250ms both;
}

.headline {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(52px, 8vw, 140px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 0.96;
  max-width: 14ch;
  text-wrap: balance;
  color: var(--orange);
  animation: rise-in 1100ms var(--ease-out-expo) 350ms both;
}

.lead {
  margin: 0;
  font-size: 15px;
  line-height: 1.55;
  letter-spacing: 0.02em;
  color: var(--ink);
  max-width: 52ch;
  text-wrap: balance;
  animation: rise-in 900ms var(--ease-out-expo) 500ms both;
}

/* the container is animated (not .cta) so the entrance transform
   doesn't override the hover/active transforms on the link */
.ctas {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
  flex-wrap: wrap;
  animation: rise-in 900ms var(--ease-out-expo) 650ms both;
}

.cta {
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--orange);
  padding: 14px 24px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  position: relative;
  transition:
    color 160ms var(--ease-out),
    transform 160ms var(--ease-out);
}

.cta:hover {
  color: var(--orange-deep);
  transform: translateY(-2px);
}

.cta:active {
  transform: translateY(1px);
}

/* ============ Events section ============ */
.events {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 200px 24px 140px;
}

/* dithered tree leaning in from the right (mirrored), its branches
   reaching up behind the section content (cards are opaque paper, so
   it reads in the gaps and margins); the trunk dissolves toward the
   bottom — like the hero hands — so its base is never on screen.
   the wrapper animates the grow-in (origin bottom = it sprouts upward
   from its base), the img holds the mirror/mask/art-opacity so the two
   never collide */
.events-tree {
  position: absolute;
  /* full-bleed: anchor the right edge to the real viewport edge (not the
     1120px content column) with a small bleed, so the branches touch /
     run off the screen edge on every width. 50% resolves to half the
     centred column, so this stays exact regardless of screen size. */
  right: calc(50% - 50vw - 20px);
  top: 24px;
  height: min(120vh, 1200px);
  /* the svg ships with only a viewBox (975×1481), so the ratio has to
     come from here for the box to have a width */
  aspect-ratio: 975 / 1481;
  width: auto;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  /* grows upward from its base at the bottom, like a sprouting tree */
  transform-origin: 50% 100%;
  opacity: 0;
  transform: scale(0.28);
  transition:
    transform 1200ms var(--ease-out-expo),
    opacity 700ms var(--ease-out);
}

.events-tree.shown {
  opacity: 1;
  transform: scale(1);
}

.events-tree img {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.85;
  transform: scaleX(-1); /* mirror, in place — wrapper handles the grow */
  -webkit-mask-image: linear-gradient(to bottom, #000 62%, transparent 96%);
  mask-image: linear-gradient(to bottom, #000 62%, transparent 96%);
}

/* second (landscape) dithered tree anchored to the bottom-left, beside
   the past events; same layer as the main tree — content stacks above.
   grows up from its base at the bottom as it scrolls into view */
.events-tree2 {
  position: absolute;
  /* full-bleed to the real left viewport edge — so the crop happens off
     the screen edge (a natural bleed) instead of being sliced mid-page
     at the content column edge on large screens */
  left: calc(50% - 50vw - 20px);
  bottom: 0;
  height: min(52vh, 460px);
  aspect-ratio: 1025 / 640; /* svg is viewBox-only, see .events-tree */
  width: auto;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  transform-origin: 30% 100%;
  opacity: 0;
  transform: scale(0.4);
  transition:
    transform 1200ms var(--ease-out-expo),
    opacity 720ms var(--ease-out);
}

.events-tree2.shown {
  opacity: 1;
  transform: scale(1);
}

.events-tree2 img {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.85;
  /* dissolve into the paper toward the bottom edge, like the main tree */
  -webkit-mask-image: linear-gradient(to bottom, #000 62%, transparent 96%);
  mask-image: linear-gradient(to bottom, #000 62%, transparent 96%);
}

.events-title {
  position: relative;
  z-index: 1;
  margin: 0 0 52px;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(34px, 4.6vw, 56px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--orange);
  text-wrap: balance;
}

.events-title-past {
  margin-top: 130px;
  color: var(--muted);
}

/* with no upcoming events the past list is the whole section, so shrink
   its heading and tighten the gap — it reads as a quiet "recent" glance
   under the empty-state note rather than a second headline board */
.events.no-upcoming .events-title-past {
  margin-top: 60px;
  margin-bottom: 40px;
  font-size: clamp(19px, 2.2vw, 26px);
}

/* narrower fixed-width cards, centered as a group */
.event-grid {
  position: relative;
  z-index: 1;
  display: grid;
  /* auto-fit (not auto-fill) collapses empty tracks so the cards
     stay centred as a group even when there are only one or two */
  grid-template-columns: repeat(auto-fit, 230px);
  justify-content: center;
  gap: 20px;
}

/* ============ Card deal-in ============ */
/* the wrappers animate (not .card) so the entrance transforms never
   fight the card's own hover transition. --dx, .hit and every delay
   are set per card by useCardDeal at trigger time. two states driven
   by .dealt: base = gathered under the stamp, .dealt = spread out.
   transitions (not keyframes) so removing .dealt on scroll-out plays
   the whole sequence backwards, and a mid-flight direction change
   just turns around. transition timings live on the DESTINATION
   state: .dealt rules time the deal, base rules time the un-deal. */
.deal,
.deal-inner {
  display: grid; /* stretch the card to fill its 230px cell, as before */
}

/* gathered: cards sit hidden at the row centre; the centre card waits
   there too, transparent and only slightly enlarged */
.event-grid.deal-ready .deal {
  opacity: 0;
  transform: translateX(var(--dx, 0px));
  transition:
    transform 620ms var(--ease-out-expo) var(--gather-delay, 0ms),
    opacity 0s linear var(--hide-delay, 0ms);
}

.event-grid.deal-ready .deal.hit {
  opacity: 1; /* never hides — its inner does the appearing/vanishing */
  z-index: 2;
}

.event-grid.deal-ready .deal.hit .deal-inner {
  opacity: 0;
  transform: scale(1.12);
  transition:
    transform 380ms cubic-bezier(0.5, 0, 0.8, 0.7) var(--lift-delay, 0ms),
    opacity 280ms ease calc(var(--lift-delay, 0ms) + 70ms);
}

/* dealt: the centre card fades in already in place, just a bit bigger,
   and gently settles to size; then every card slides to its slot. for
   the centre card of an odd row --dx is 0 (a no-op that keeps it in
   place), for an even row the two overlapped middle cards divide,
   everyone else emerges from underneath — nearest ring first */
.event-grid.dealt .deal {
  opacity: 1;
  transform: translateX(0);
  transition:
    transform 620ms var(--ease-out-expo) var(--spread-delay, 0ms),
    opacity 0s linear var(--spread-delay, 0ms);
}

.event-grid.dealt .deal.hit .deal-inner {
  opacity: 1;
  transform: scale(1);
  transition:
    transform 420ms var(--ease-out-expo) var(--stamp-delay, 0ms),
    opacity 260ms ease-out var(--stamp-delay, 0ms);
}

/* measuring guard: lets useCardDeal write --dx without the write
   itself animating cards toward the centre */
.event-grid.deal-lock .deal,
.event-grid.deal-lock .deal-inner {
  transition: none !important;
}

.events-note {
  position: relative;
  z-index: 1;
  margin: 0;
  text-align: center;
  font-size: 15px;
  letter-spacing: 0.02em;
  color: var(--muted);
}

.events-retry {
  position: relative;
  z-index: 1;
  display: block;
  margin: 20px auto 0;
  background: none;
  border: 2px solid var(--ink);
  padding: 12px 22px;
  cursor: pointer;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  transition:
    color 160ms var(--ease-out),
    border-color 160ms var(--ease-out);
}

.events-retry:hover {
  color: var(--orange);
  border-color: var(--orange);
}

/* opens the all-past-events dialog; muted to sit with the past cards */
.events-more {
  position: relative;
  z-index: 1;
  display: block;
  margin: 40px auto 0;
  background: none;
  border: 2px solid color-mix(in srgb, var(--muted) 55%, var(--paper));
  padding: 12px 22px;
  cursor: pointer;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  transition:
    color 160ms var(--ease-out),
    border-color 160ms var(--ease-out);
}

.events-more:hover {
  color: var(--orange);
  border-color: var(--orange);
}

/* ============ Entrance ============ */
/* everything (including animation delays) waits for the intro handoff */
.hero.intro-wait .nav,
.hero.intro-wait .meta,
.hero.intro-wait .eyebrow,
.hero.intro-wait .headline,
.hero.intro-wait .lead,
.hero.intro-wait .ctas,
.hero.intro-wait .hands {
  animation-play-state: paused;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hands-in {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes menu-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes menu-rise {
  from {
    opacity: 0;
    transform: translateY(38px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes menu-grow {
  0% {
    opacity: 0;
    clip-path: inset(100% 0 0 0);
    transform: scaleY(0.4);
  }
  60% {
    opacity: 0.95;
  }
  100% {
    opacity: 0.95;
    clip-path: inset(0 0 0 0);
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav,
  .meta,
  .eyebrow,
  .headline,
  .lead,
  .ctas,
  .hands,
  .menu-overlay,
  .menu-link,
  .menu-flower {
    animation: none;
  }

  /* useCardDeal skips arming under reduced motion; this covers a
     preference flipped after the classes were already added */
  .deal,
  .deal-inner {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  /* the trees still mirror (img transform) but skip the grow-in */
  .events-tree,
  .events-tree2 {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .menu-flower {
    opacity: 0.95;
  }
}

/* ============ Mobile ============ */
@media (max-width: 640px) {
  .nav,
  .menu-header {
    padding: 16px 20px;
  }

  .logo {
    height: 42px;
  }

  .meta {
    padding: 8px 20px 0;
  }

  .location p {
    font-size: 11px;
  }

  .content {
    padding: 2vh 20px 8px;
    gap: 14px;
  }

  .eyebrow {
    font-size: 11px;
    letter-spacing: 0.14em;
    margin-bottom: 6px;
    max-width: 30ch;
  }

  .headline {
    font-size: clamp(42px, 13vw, 60px);
  }

  .lead {
    font-size: 14px;
    max-width: 34ch;
  }

  .ctas {
    flex-direction: column;
    gap: 4px;
    margin-top: 6px;
  }

  .menu-nav {
    padding: 0 20px;
  }

  .events {
    padding: 72px 20px 96px;
  }

  /* cards span the full width here, so the tree just peeks in
     quietly from the side */
  .events-tree {
    height: 60vh;
    right: -30px;
    top: 60px;
  }

  .events-tree2 {
    height: 24vh;
    bottom: 0;
  }

  .events-tree img,
  .events-tree2 img {
    opacity: 0.5;
  }

  .events-title-past {
    margin-top: 88px;
  }
}
</style>
