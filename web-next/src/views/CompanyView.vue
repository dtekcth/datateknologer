<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from "vue";
import { useLocale } from "@/composables/useLocale";
import { introPhase } from "@/composables/useIntro";
import { CONTACT } from "@/content/site";
import AboutDag from "@/components/AboutDag.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import RevealTitle from "@/components/RevealTitle.vue";
import logoUrl from "@/assets/logo-full-dark.svg";
import towerUrl from "@/assets/tower2_dither.svg";
import beeUrl from "@/assets/bee_dither.svg";
import nestUrl from "@/assets/nest2_dither.svg";
import honeycombUrl from "@/assets/honeycomb_dither.svg";
import flowersUrl from "@/assets/flowers-dither.svg";
import handsUrl from "@/assets/hands-touch-dither.svg";

const { lang, otherLang } = useLocale();

/* entrance stays paused until the intro logo has flown into the nav */
const introWait = computed(
  () => introPhase.value === "hold" || introPhase.value === "morph",
);

const menuOpen = ref(false);

/* ============ Services ============ */
/* recipient lives in src/content/site.ts — edit it there */
const EMAIL = CONTACT.companyEmail;

/* card → detail dialog; stored as an index so the open dialog follows
   a language toggle */
const selectedIdx = ref<number | null>(null);
const selectedService = computed(() =>
  selectedIdx.value === null ? null : copy.value.services[selectedIdx.value],
);

/* ============ Get in touch form ============ */
/* no contact endpoint yet — submitting composes a prefilled email in
   the visitor's own mail client instead */
const formName = ref("");
const formCompany = ref("");
const formEmail = ref("");
const formService = ref("");
const formDescription = ref("");

const submitContact = () => {
  const c = copy.value;
  const service = formService.value || c.serviceOther;
  const subject = `${service} — ${formCompany.value}`;
  const body = [
    `${c.fieldName}: ${formName.value}`,
    `${c.fieldCompany}: ${formCompany.value}`,
    `${c.fieldEmail}: ${formEmail.value}`,
    `${c.fieldService}: ${service}`,
    "",
    formDescription.value,
  ].join("\n");
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/* overlays hide the page but keep it in the scroll flow */
watch([menuOpen, selectedIdx], ([menu, sel]) => {
  document.body.style.overflow = menu || sel !== null ? "hidden" : "";
});

/* innermost overlay first */
const onKeydown = (e: KeyboardEvent) => {
  if (e.key !== "Escape") return;
  if (selectedIdx.value !== null) {
    selectedIdx.value = null;
    return;
  }
  menuOpen.value = false;
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});

/* the program section's nest + bees rise in when it scrolls into view
   (and sink back out on the way up). the bees' reveal delays follow the
   Fibonacci sequence — set per bee via --d in the CSS. */
const decorEl = ref<HTMLElement | null>(null);
const decorShown = ref(false);
let decorObserver: IntersectionObserver | null = null;

/* services grid: cards rise up staggered when the grid scrolls in */
const svcGridEl = ref<HTMLElement | null>(null);
const svcShown = ref(false);
let svcObserver: IntersectionObserver | null = null;

/* get in touch: the split hands slide together and the form rises when
   the section scrolls in (same reversible pattern as get-involved) */
const contactStageEl = ref<HTMLElement | null>(null);
const contactShown = ref(false);
let contactObserver: IntersectionObserver | null = null;

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    decorShown.value = true;
    svcShown.value = true;
    contactShown.value = true;
    return;
  }
  if (decorEl.value) {
    decorObserver = new IntersectionObserver(
      (entries) => {
        decorShown.value = entries[entries.length - 1].isIntersecting;
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    decorObserver.observe(decorEl.value);
  }
  if (svcGridEl.value) {
    svcObserver = new IntersectionObserver(
      (entries) => {
        svcShown.value = entries[entries.length - 1].isIntersecting;
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    svcObserver.observe(svcGridEl.value);
  }
  if (contactStageEl.value) {
    contactObserver = new IntersectionObserver(
      (entries) => {
        contactShown.value = entries[entries.length - 1].isIntersecting;
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    contactObserver.observe(contactStageEl.value);
  }
});

onBeforeUnmount(() => {
  decorObserver?.disconnect();
  svcObserver?.disconnect();
  contactObserver?.disconnect();
});

/* ============ Program block animations ============ */
/* each block wakes when scrolled into view: heading, paragraph and stat
   labels cascade up (css transitions), while the stat figures count up
   on a rAF. scrolling back out resets them, so it all replays on
   re-entry like the other reveals. */
const COUNT_MS = 1600; // stat count-up duration

const progBlockEl = ref<HTMLElement | null>(null);
const divBlockEl = ref<HTMLElement | null>(null);
const progShown = ref(false);
const divShown = ref(false);
const progCounts = ref<number[]>([0, 0, 0]);
const divCounts = ref<number[]>([0, 0]);

const blockObservers: IntersectionObserver[] = [];
const blockRafs = new Map<Ref<number[]>, number>();

const cancelRun = (counts: Ref<number[]>) => {
  const id = blockRafs.get(counts);
  if (id !== undefined) cancelAnimationFrame(id);
  blockRafs.delete(counts);
};

const runBlock = (counts: Ref<number[]>, getValues: () => number[]) => {
  cancelRun(counts);
  const start = performance.now();
  const tick = (now: number) => {
    const k = Math.min(1, (now - start) / COUNT_MS);
    const ease = 1 - (1 - k) ** 3; /* cubic out — fast start, soft landing */
    counts.value = getValues().map((v) => Math.round(v * ease));
    if (k < 1) {
      blockRafs.set(counts, requestAnimationFrame(tick));
    } else {
      blockRafs.delete(counts);
    }
  };
  blockRafs.set(counts, requestAnimationFrame(tick));
};

const armBlock = (
  el: HTMLElement | null,
  shown: Ref<boolean>,
  counts: Ref<number[]>,
  getValues: () => number[],
) => {
  if (!el) return;
  const io = new IntersectionObserver(
    (entries) => {
      const isIn = entries[entries.length - 1].isIntersecting;
      if (isIn === shown.value) return;
      shown.value = isIn;
      if (isIn) {
        runBlock(counts, getValues);
      } else {
        cancelRun(counts);
        counts.value = getValues().map(() => 0);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
  );
  io.observe(el);
  blockObservers.push(io);
};

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    /* no counting — everything lands fully formed */
    progShown.value = true;
    divShown.value = true;
    progCounts.value = copy.value.programStats.map((s) => s.value);
    divCounts.value = copy.value.divisionStats.map((s) => s.value);
    return;
  }
  armBlock(progBlockEl.value, progShown, progCounts, () =>
    copy.value.programStats.map((s) => s.value),
  );
  armBlock(divBlockEl.value, divShown, divCounts, () =>
    copy.value.divisionStats.map((s) => s.value),
  );
});

onBeforeUnmount(() => {
  blockObservers.forEach((o) => o.disconnect());
  blockRafs.forEach((id) => cancelAnimationFrame(id));
  blockRafs.clear();
});

const copy = computed(() =>
  lang.value === "sv"
    ? {
        menuLabel: "Meny",
        menuCloseLabel: "Stäng",
        menuProgram: "Program",
        menuServices: "Tjänster",
        menuAbout: "Om DAG",
        menuContact: "Kontakta oss",
        menuStudent: "För studenter",
        eyebrow: "För dig som vill nå Chalmers Datateknik-studenter",
        headline: "Möt era framtida medarbetare.",
        lead: "Lunchföreläsningar, casekvällar och studiebesök — kom i kontakt med Chalmers vassaste Datateknik-studenter.",
        locationLabel: "Plats",
        locationLine1: "Chalmers tekniska högskola",
        locationLine2: "Göteborg",
        ctaServices: "Visa våra tjänster",
        programTitle: "Om vårt program",
        programHeading: "Programmet",
        programBody:
          "Vi är ett av de snabbast växande programmen på Chalmers tekniska högskola — det tredje högst rankade ingenjörsuniversitetet i Norden — och har fördubblat antalet nya studenter sedan 2019. Våra studenter kan gå vidare till ett brett urval av masterprogram, från datorhårdvara och automation till mjukvaruhantering.",
        programStats: [
          { value: 170, label: "Nya studenter varje år" },
          { value: 11, label: "Masterprogram" },
          { value: 802, label: "Studenter totalt" },
        ],
        divisionHeading: "Vår sektion",
        divisionBody:
          "Vi är en av de största studentsektionerna på Chalmers, och även om vi inte är störst har vi det högsta engagemanget med över 100 nya volontärer varje år. Den svenska trenden med minskande engagemang syns inte hos oss — till skillnad från andra universitet växer vi stadigt genom att skapa nya former av engagemang.",
        divisionStats: [
          { value: 22, label: "Kommittéer & föreningar" },
          { value: 102, label: "Nya volontärer varje år" },
        ],
        servicesTitle: "Tjänster",
        servicesDetails: "Detaljer",
        servicesContact: "Kontakta oss",
        contactTitle: "Kontakta oss",
        contactLead: "Berätta vad ni är ute efter så återkommer vi.",
        fieldName: "Namn",
        fieldCompany: "Företag",
        fieldEmail: "E-post",
        fieldService: "Tjänst",
        fieldDescription: "Beskrivning",
        servicePlaceholder: "Välj tjänst",
        serviceOther: "Annat / allmänt",
        contactSubmit: "Skicka",
        services: [
          {
            title: "Direkt engagemang på campus",
            blurb: "",
            body: "Inget mässmingel — en fullsatt föreläsningssal, en kväll med riktiga samtal eller en hel dag med intervjuer som vi arrangerar på campus. Ni möter studenterna innan de ens når jobbportalerna, och de minns människor, inte logotyper. Företag åker hem med CV:n i handen och ansikten att koppla till dem.",
            tags: [
              "Lunchföreläsningar",
              "Nätverkskvällar",
              "Skräddarsydda kvällsevent",
              "Intervjudagar",
            ],
          },
          {
            title: "Synlighet och marknadsföring",
            blurb: "Nå studenterna där de är",
            body: "En bokning, alla kanaler. Vi bär ert budskap genom vårt veckobrev, en Discord med över 1 100 medlemmar, Instagram, Facebook, LinkedIn och affischer över hela campus. Skicka materialet till oss så ser hela sektionen det — från ettor till masterstudenter på jakt efter exjobb.",
            tags: [
              "Veckobrev",
              "Paket för sociala medier",
              "Sponsrade event",
              "Sommarjobb & exjobbsannonser",
            ],
          },
          {
            title: "Hackathon",
            blurb: "",
            body: "Det mest intensiva formatet vi kör. Ge lagen ett riktigt problem från er verksamhet och se dem designa, bygga och leverera kring det under en hel helg. Ni ser exakt hur människor tänker under press — det närmaste ett riktigt arbetsprov man kommer. Partnerplatserna är begränsade, och de går åt först.",
            tags: [
              "Ert eget case",
              "Jury & prisutdelning",
              "Branding hela helgen",
              "Direktkontakt med lagen",
            ],
          },
          {
            title: "Skräddarsydda paket",
            blurb: "Bygg ert perfekta samarbete",
            body: "Inga två rekryteringsmål ser likadana ut. Kombinera fritt ur allt vi erbjuder — en föreläsning i höst, intervjudagar på våren, synlighet däremellan — så formar vi ett paket efter era behov och er tidsplan. En kontakt på DAG, en plan för året.",
            tags: [] as string[],
          },
        ],
      }
    : {
        menuLabel: "Menu",
        menuCloseLabel: "Close",
        menuProgram: "Program",
        menuServices: "Services",
        menuAbout: "About DAG",
        menuContact: "Get in touch",
        menuStudent: "For students",
        eyebrow: "For companies looking to reach Chalmers CSE students",
        headline: "Meet your future employees.",
        lead: "Lunch lectures, case evenings and study visits — connect with Chalmers' sharpest CSE students.",
        locationLabel: "Location",
        locationLine1: "Chalmers University of Technology",
        locationLine2: "Gothenburg",
        ctaServices: "View our services",
        programTitle: "About our program",
        programHeading: "The program",
        programBody:
          "We are one of the fastest growing programs at Chalmers University of Technology — the third-ranked engineering university in the Nordics — having doubled the amount of new students since 2019. Our students are able to move on to a diverse selection of Master programmes, ranging from computer hardware, to automation, to software management.",
        programStats: [
          { value: 170, label: "New students every year" },
          { value: 11, label: "Master programs" },
          { value: 802, label: "Total students" },
        ],
        divisionHeading: "Our division",
        divisionBody:
          "We are one of the largest student divisions at Chalmers, and while we are not the largest, we do have the highest engagement rate with over 100 new volunteers every year. The Swedish trend of diminishing involvement can not be seen at our division, in contrast to other universities we are growing steadily by creating new forms of engagement.",
        divisionStats: [
          { value: 22, label: "Committees & Societies" },
          { value: 102, label: "New volunteers every year" },
        ],
        servicesTitle: "Services",
        servicesDetails: "Details",
        servicesContact: "Get in touch",
        contactTitle: "Get in touch",
        contactLead: "Tell us what you're after and we'll get back to you.",
        fieldName: "Name",
        fieldCompany: "Company",
        fieldEmail: "Email",
        fieldService: "Service",
        fieldDescription: "Description",
        servicePlaceholder: "Select a service",
        serviceOther: "Other / general",
        contactSubmit: "Send",
        services: [
          {
            title: "Direct campus engagement",
            blurb: "",
            body: "No careers-fair small talk — a full lecture hall, an evening of real conversations, or a day of interviews we arrange on campus. You meet students before they ever reach the job boards, and they remember people, not logos. Companies leave with CVs in hand and faces to match.",
            tags: [
              "Lunch lectures",
              "Networking evenings",
              "Custom evening events",
              "Interview days",
            ],
          },
          {
            title: "Brand visibility and marketing",
            blurb: "Reach students where they are",
            body: "One booking, every channel. We carry your message through our weekly newsletter, a 1,100+ member Discord, Instagram, Facebook, LinkedIn and posters across campus. Send us the material and the whole division sees it — from first-years to thesis-hunting master's students.",
            tags: [
              "Weekly newsletter",
              "Social media packages",
              "Sponsor events",
              "Summer job & thesis postings",
            ],
          },
          {
            title: "Hackathons",
            blurb: "",
            body: "The most intense format we run. Hand the teams a real problem from your business and watch them design, build and ship around it for a full weekend. You see exactly how people think under pressure — the closest thing to a work-sample interview that exists. Partner slots are limited, and they go first.",
            tags: [
              "Your own case",
              "Jury & prize ceremony",
              "Weekend-long branding",
              "Direct team access",
            ],
          },
          {
            title: "Custom packages",
            blurb: "Build your perfect partnership",
            body: "No two recruiting goals look the same. Mix and match anything we offer — a lecture this autumn, interview days in spring, visibility in between — and we shape a package around your needs and your timeline. One contact at DAG, one plan for the year.",
            tags: [] as string[],
          },
        ],
      },
);
</script>

<template>
  <div class="company">
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
        <a class="menu-link" href="#program" @click="menuOpen = false">
          {{ copy.menuProgram }}
        </a>
        <a class="menu-link" href="#services" @click="menuOpen = false">
          {{ copy.menuServices }}
        </a>
        <a class="menu-link" href="#om" @click="menuOpen = false">
          {{ copy.menuAbout }}
        </a>
        <a class="menu-link" href="#kontakt" @click="menuOpen = false">
          {{ copy.menuContact }}
        </a>
        <RouterLink
          class="menu-link"
          :to="{ name: 'student', params: { lang } }"
        >
          {{ copy.menuStudent }}
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
      <div class="tower-scene" aria-hidden="true">
        <div class="tower-wrap">
          <img class="tower" :src="towerUrl" alt="" />
        </div>
        <img class="bee bee-1" :src="beeUrl" alt="" />
        <img class="bee bee-2" :src="beeUrl" alt="" />
        <img class="bee bee-3" :src="beeUrl" alt="" />
        <img class="bee bee-4" :src="beeUrl" alt="" />
        <img class="bee bee-5" :src="beeUrl" alt="" />
        <img class="bee bee-6" :src="beeUrl" alt="" />
        <img class="bee bee-7" :src="beeUrl" alt="" />
        <img class="bee bee-8" :src="beeUrl" alt="" />
        <img class="bee bee-9" :src="beeUrl" alt="" />
      </div>

      <div class="content">
        <span class="eyebrow">{{ copy.eyebrow }}</span>
        <h1 class="headline">{{ copy.headline }}</h1>
        <p class="lead">{{ copy.lead }}</p>

        <div class="ctas">
          <a class="cta" href="#services">
            {{ copy.ctaServices }}
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

          <a class="cta cta-secondary" href="#kontakt">
            {{ copy.servicesContact }}
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

  <!-- ============ About our program ============ -->
  <section id="program" class="program">
    <div
      ref="decorEl"
      class="prog-decor"
      :class="{ shown: decorShown }"
      aria-hidden="true"
    >
      <span class="nest"><img class="nest-img" :src="nestUrl" alt="" /></span>
      <span class="prog-bee pb-1"><img class="pb-img" :src="beeUrl" alt="" /></span>
      <span class="prog-bee pb-2"><img class="pb-img" :src="beeUrl" alt="" /></span>
      <span class="prog-bee pb-3"><img class="pb-img" :src="beeUrl" alt="" /></span>
      <span class="prog-bee pb-4"><img class="pb-img" :src="beeUrl" alt="" /></span>
      <span class="prog-bee pb-5"><img class="pb-img" :src="beeUrl" alt="" /></span>
      <span class="prog-bee pb-6"><img class="pb-img" :src="beeUrl" alt="" /></span>
      <span class="prog-bee pb-7"><img class="pb-img" :src="beeUrl" alt="" /></span>
      <span class="prog-bee pb-8"><img class="pb-img" :src="beeUrl" alt="" /></span>
      <span class="prog-bee pb-9"><img class="pb-img" :src="beeUrl" alt="" /></span>
      <span class="prog-bee pb-10"><img class="pb-img" :src="beeUrl" alt="" /></span>
      <span class="prog-bee pb-11"><img class="pb-img" :src="beeUrl" alt="" /></span>
    </div>

    <RevealTitle class="program-title" :text="copy.programTitle" />

    <div ref="progBlockEl" class="prog-block" :class="{ shown: progShown }">
      <h3 class="prog-subtitle">{{ copy.programHeading }}</h3>
      <p class="prog-lead">{{ copy.programBody }}</p>
      <dl class="stats">
        <div v-for="(s, i) in copy.programStats" :key="s.label" class="stat">
          <dt class="stat-num">{{ progCounts[i] }}</dt>
          <dd class="stat-label">{{ s.label }}</dd>
        </div>
      </dl>
    </div>

    <div ref="divBlockEl" class="prog-block" :class="{ shown: divShown }">
      <h3 class="prog-subtitle">{{ copy.divisionHeading }}</h3>
      <p class="prog-lead">{{ copy.divisionBody }}</p>
      <dl class="stats">
        <div v-for="(s, i) in copy.divisionStats" :key="s.label" class="stat">
          <dt class="stat-num">{{ divCounts[i] }}</dt>
          <dd class="stat-label">{{ s.label }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <!-- ============ Services ============ -->
  <section id="services" class="services">
    <RevealTitle class="services-title" :text="copy.servicesTitle" />

    <div class="svc-stage">
      <div class="svc-comb" :class="{ shown: svcShown }" aria-hidden="true">
        <img :src="honeycombUrl" alt="" />
      </div>

      <div ref="svcGridEl" class="svc-grid" :class="{ shown: svcShown }">
        <article
          v-for="(s, i) in copy.services"
          :key="s.title"
          class="svc-card"
          :style="{ '--i': i }"
          @click="selectedIdx = i"
        >
        <div class="svc-head">
          <span class="svc-num">{{ `0${i + 1}` }}</span>
          <h3 class="svc-name">{{ s.title }}</h3>
        </div>
        <p v-if="s.blurb" class="svc-blurb-card">{{ s.blurb }}</p>
        <ul v-if="s.tags.length" class="svc-tags">
          <li v-for="t in s.tags" :key="t">{{ t }}</li>
        </ul>
        <div class="svc-foot">
          <button
            class="svc-details"
            :aria-label="`${copy.servicesDetails}: ${s.title}`"
            @click.stop="selectedIdx = i"
          >
            {{ copy.servicesDetails }} +
          </button>
          <a
            class="svc-cta"
            href="#kontakt"
            @click.stop="formService = s.title"
          >
            {{ copy.servicesContact }}
          </a>
        </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ============ About DAG ============ -->
  <AboutDag />

  <!-- ============ Get in touch ============ -->
  <section id="kontakt" class="contact">
    <RevealTitle class="contact-title" :text="copy.contactTitle" />
    <p class="contact-lead">{{ copy.contactLead }}</p>

    <div
      ref="contactStageEl"
      class="contact-stage"
      :class="{ shown: contactShown }"
    >
      <!-- the same image split down the middle: each half slides in from
           its own side and the two meet to form the touching hands -->
      <div class="contact-hands" aria-hidden="true">
        <span class="hand hand-l"><img :src="handsUrl" alt="" /></span>
        <span class="hand hand-r"><img :src="handsUrl" alt="" /></span>
      </div>

      <form class="contact-form" @submit.prevent="submitContact">
      <label class="field">
        <span class="field-label">{{ copy.fieldName }}</span>
        <input v-model="formName" type="text" name="name" required />
      </label>

      <label class="field">
        <span class="field-label">{{ copy.fieldCompany }}</span>
        <input v-model="formCompany" type="text" name="company" required />
      </label>

      <label class="field">
        <span class="field-label">{{ copy.fieldEmail }}</span>
        <input v-model="formEmail" type="email" name="email" required />
      </label>

      <label class="field">
        <span class="field-label">{{ copy.fieldService }}</span>
        <select v-model="formService" name="service" required>
          <option value="" disabled>{{ copy.servicePlaceholder }}</option>
          <option
            v-for="s in copy.services"
            :key="s.title"
            :value="s.title"
          >
            {{ s.title }}
          </option>
          <option :value="copy.serviceOther">{{ copy.serviceOther }}</option>
        </select>
      </label>

      <label class="field field-wide">
        <span class="field-label">{{ copy.fieldDescription }}</span>
        <textarea
          v-model="formDescription"
          name="description"
          rows="6"
          required
        ></textarea>
      </label>

      <button class="contact-submit" type="submit">
        {{ copy.contactSubmit }}
      </button>
      </form>
    </div>
  </section>

  <!-- ============ Footer ============ -->
  <SiteFooter />

  <!-- ============ Service detail dialog ============ -->
  <div
    v-if="selectedService"
    class="svc-overlay"
    @click.self="selectedIdx = null"
  >
    <div
      class="svc-modal"
      role="dialog"
      aria-modal="true"
      :aria-label="selectedService.title"
    >
      <button
        class="svc-close"
        :aria-label="copy.menuCloseLabel"
        @click="selectedIdx = null"
      >
        <svg
          width="22"
          height="22"
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
      </button>

      <p v-if="selectedService.blurb" class="svc-blurb">
        {{ selectedService.blurb }}
      </p>
      <h3 class="svc-modal-title">{{ selectedService.title }}</h3>
      <p class="svc-body">{{ selectedService.body }}</p>
      <ul v-if="selectedService.tags.length" class="svc-tags svc-tags-modal">
        <li v-for="t in selectedService.tags" :key="t">{{ t }}</li>
      </ul>
      <a
        class="svc-cta svc-cta-modal"
        href="#kontakt"
        @click="formService = selectedService.title; selectedIdx = null"
      >
        {{ copy.servicesContact }}
      </a>
    </div>
  </div>
  </div>
</template>

<style scoped>
/* keep the page from scrolling sideways (matches the student page) */
.company {
  overflow-x: clip;
}

/* ============ About our program ============ */
.program {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 200px 24px 160px;
}

/* decorative layer behind the text: the nest sits on the left between
   the two blocks, with a swarm of bees around it. under content (z 0). */
.prog-decor {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.nest {
  position: absolute;
  /* unmirrored so the branch end sits at the left screen edge, hive bulb
     toward the page; vertically centred (~55%) between the two blocks —
     the "program" / "our division" gap. the wrapper fades the TOP of the
     art into the paper; the img inside fades the inner end. two elements
     because two mask directions can't reliably combine on one. */
  display: block;
  left: calc(50% - 50vw + 8px);
  top: 55%;
  width: min(52vw, 680px);
  -webkit-mask-image: linear-gradient(to top, #000 70%, transparent 100%);
  mask-image: linear-gradient(to top, #000 70%, transparent 100%);
  opacity: 0;
  /* waits fully off the left edge, slides in on reveal, then sits still */
  transform: translateY(-50%) translateX(-108%);
  transition:
    opacity 700ms var(--ease-out),
    transform 1200ms var(--ease-out-expo);
}

.prog-decor.shown .nest {
  opacity: 0.55;
  transform: translateY(-50%) translateX(0);
}

.nest-img {
  display: block;
  width: 100%;
  height: auto;
  /* both ends dissolve into the paper: the branch tip at the screen edge
     (left) and the inner end toward the text (right) */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 15%,
    #000 58%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 15%,
    #000 58%,
    transparent 100%
  );
}

/* each bee: wrapper does the rise-in (delay = its Fibonacci step, --d);
   the inner img holds the static facing (rotation / mirror) */
.prog-bee {
  position: absolute;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 520ms var(--ease-out) var(--d, 0ms),
    transform 640ms var(--ease-out-expo) var(--d, 0ms);
}

.prog-decor.shown .prog-bee {
  opacity: 0.8;
  transform: translateY(0);
}

/* each bee's facing lives in --pose so the hover-bob keyframes can
   compose with it (animation transforms would otherwise override it) */
.pb-img {
  display: block;
  width: 100%;
  height: auto;
  transform: var(--pose, none);
}

/* once revealed, the swarm hovers in place — duration and phase are
   derived from each bee's --d so no two bees bob in step */
.prog-decor.shown .pb-img {
  animation: bee-hover calc(2800ms + var(--d, 0ms)) ease-in-out
    calc(var(--d, 0ms) * -3) infinite;
}

@keyframes bee-hover {
  0%,
  100% {
    transform: var(--pose, none) translateY(0);
  }
  50% {
    transform: var(--pose, none) translateY(-7px);
  }
}

/* Fibonacci reveal — delays follow 1,1,2,3,5,8,13,21 (× 60ms) so the
   bees pop in gently accelerating, then spacing out. the swarm drifts
   down the right side of the section, opposite the hive. */
.pb-1 {
  left: 84%;
  top: 12%;
  width: clamp(22px, 2.8vw, 36px);
  --d: 60ms;
  --pose: rotate(-16deg);
}

.pb-2 {
  left: 90%;
  top: 22%;
  width: clamp(16px, 2vw, 26px);
  --d: 60ms;
  --pose: scaleX(-1) rotate(24deg);
}

.pb-3 {
  left: 79%;
  top: 27%;
  width: clamp(18px, 2.3vw, 30px);
  --d: 120ms;
  --pose: rotate(-10deg);
}

.pb-4 {
  left: 86%;
  top: 38%;
  width: clamp(24px, 3vw, 40px);
  --d: 180ms;
  --pose: scaleX(-1) rotate(14deg);
}

.pb-5 {
  left: 93%;
  top: 45%;
  width: clamp(15px, 1.9vw, 24px);
  --d: 300ms;
  --pose: rotate(-28deg);
}

.pb-6 {
  left: 76%;
  top: 50%;
  width: clamp(18px, 2.3vw, 30px);
  --d: 480ms;
  --pose: scaleX(-1) rotate(20deg);
}

.pb-7 {
  left: 83%;
  top: 60%;
  width: clamp(16px, 2vw, 26px);
  --d: 780ms;
  --pose: rotate(-6deg);
}

.pb-8 {
  left: 90%;
  top: 70%;
  width: clamp(14px, 1.8vw, 22px);
  --d: 1260ms;
  --pose: scaleX(-1) rotate(-8deg);
}

/* a few bees drifting below the "our division" block */
.pb-9 {
  left: 34%;
  top: 90%;
  width: clamp(18px, 2.3vw, 30px);
  --d: 120ms;
  --pose: rotate(18deg);
}

.pb-10 {
  left: 52%;
  top: 94%;
  width: clamp(15px, 1.9vw, 24px);
  --d: 300ms;
  --pose: scaleX(-1) rotate(-14deg);
}

.pb-11 {
  left: 63%;
  top: 88%;
  width: clamp(16px, 2vw, 26px);
  --d: 480ms;
  --pose: rotate(28deg);
}

.program-title {
  position: relative;
  z-index: 1;
  margin: 0 0 72px;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(34px, 4.6vw, 56px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--orange);
  text-wrap: balance;
}

.prog-block {
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;
}

.prog-block + .prog-block {
  margin-top: 100px;
}

.prog-subtitle {
  margin: 0 0 18px;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(22px, 2.6vw, 32px);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--ink);
  /* rises in when the block scrolls into view */
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 600ms var(--ease-out),
    transform 700ms var(--ease-out-expo);
}

.prog-block.shown .prog-subtitle {
  opacity: 1;
  transform: translateY(0);
}

.prog-lead {
  margin: 0 auto;
  max-width: 60ch;
  text-align: center;
  font-size: 15px;
  line-height: 1.65;
  letter-spacing: 0.02em;
  color: var(--ink);
  text-wrap: balance;
  /* rises in just after the heading — one cascade down the block */
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 650ms var(--ease-out) 140ms,
    transform 750ms var(--ease-out-expo) 140ms;
}

.prog-block.shown .prog-lead {
  opacity: 1;
  transform: translateY(0);
}

/* big-number stats — display figures in orange, mono caption below */
.stats {
  margin: 44px 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px 56px;
}

/* ============ Services ============ */
.services {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px 150px;
}

.services-title {
  margin: 0 0 56px;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(34px, 4.6vw, 56px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--orange);
  text-wrap: balance;
}

.svc-stage {
  position: relative;
}

/* honeycomb backdrop: fills the grid area behind the cards, feathered
   at every edge so it dissolves into the paper. the opaque cards sit
   over it (z-index) and it reads through the gaps between them. */
.svc-comb {
  position: absolute;
  inset: -5% -3%;
  z-index: 0;
  opacity: 0;
  transition: opacity 900ms var(--ease-out) 200ms;
}

.svc-comb.shown {
  opacity: 0.4;
}

.svc-comb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-mask-image: radial-gradient(
    ellipse 66% 70% at center,
    #000 12%,
    transparent 76%
  );
  mask-image: radial-gradient(
    ellipse 66% 70% at center,
    #000 12%,
    transparent 76%
  );
}

.svc-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 320px));
  justify-content: center;
  gap: 24px;
}

/* the last service (custom packages) runs full-width under the row with
   its content centred — the "combine everything" banner */
.svc-card:last-child {
  grid-column: 1 / -1;
  align-items: center;
  text-align: center;
}

.svc-card:last-child .svc-head {
  align-items: center;
}

.svc-card:last-child .svc-blurb-card {
  max-width: 52ch;
}

.svc-card:last-child .svc-foot {
  justify-content: center;
  gap: 20px;
}

@media (max-width: 880px) {
  .svc-grid {
    grid-template-columns: repeat(2, minmax(0, 320px));
  }

  /* keeps the third card from sitting alone in a half-empty row */
  .svc-card:nth-child(3) {
    grid-column: 1 / -1;
  }
}

@media (max-width: 580px) {
  .svc-grid {
    grid-template-columns: minmax(0, 420px);
  }
}

.svc-card {
  margin: 0;
  border: 2px solid var(--ink);
  background: var(--paper);
  padding: 26px 24px 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  cursor: pointer;
  /* reveal (slow, staggered via --i) and hover (fast) animate different
     properties so they never fight */
  opacity: 0;
  transform: translateY(26px);
  transition:
    opacity 600ms var(--ease-out) calc(var(--i) * 110ms),
    transform 700ms var(--ease-out-expo) calc(var(--i) * 110ms),
    border-color 160ms var(--ease-out),
    box-shadow 160ms var(--ease-out);
}

.svc-grid.shown .svc-card {
  opacity: 1;
  transform: translateY(0);
}

.svc-card:hover {
  border-color: var(--orange);
  box-shadow: 7px 7px 0 color-mix(in srgb, var(--orange) 28%, transparent);
}

.svc-head {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.svc-num {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--orange);
}

.svc-name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.svc-blurb-card {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.02em;
  color: var(--muted);
}

.svc-tags {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.svc-tags li {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid color-mix(in srgb, var(--muted) 45%, transparent);
  padding: 5px 9px;
}

.svc-foot {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.svc-details {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color 150ms var(--ease-out);
}

.svc-card:hover .svc-details,
.svc-details:hover {
  color: var(--orange);
}

.svc-cta {
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--orange);
  border: 2px solid var(--orange);
  padding: 9px 12px;
  transition:
    background 150ms var(--ease-out),
    color 150ms var(--ease-out);
}

.svc-cta:hover {
  background: var(--orange);
  color: var(--paper);
}

/* ---- service detail dialog ---- */
.svc-overlay {
  position: fixed;
  inset: 0;
  z-index: 6;
  background: color-mix(in srgb, var(--ink) 34%, transparent);
  display: grid;
  place-items: center;
  padding: 24px;
  animation: menu-fade 200ms var(--ease-out) both;
}

.svc-modal {
  position: relative;
  width: min(560px, 100%);
  max-height: min(84vh, 720px);
  overflow: auto;
  background: var(--paper);
  border: 2px solid var(--ink);
  padding: 38px 34px 32px;
  animation: svc-pop 260ms var(--ease-out-expo) both;
}

.svc-close {
  position: absolute;
  top: 14px;
  right: 14px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: var(--ink);
  transition: color 150ms var(--ease-out);
}

.svc-close:hover {
  color: var(--orange);
}

.svc-blurb {
  margin: 0 0 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--orange);
}

.svc-modal-title {
  margin: 0 0 16px;
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 30px);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.svc-body {
  margin: 0 0 22px;
  font-size: 15px;
  line-height: 1.65;
  letter-spacing: 0.02em;
  color: var(--ink);
}

.svc-tags-modal {
  margin-bottom: 26px;
}

.svc-cta-modal {
  display: inline-block;
}

@keyframes svc-pop {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ============ Get in touch ============ */
.contact {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
  padding: 0 24px 160px;
}

.contact-title {
  margin: 0 0 18px;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(34px, 4.6vw, 56px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--orange);
  text-wrap: balance;
}

.contact-lead {
  margin: 0 auto 44px;
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
  letter-spacing: 0.02em;
  color: var(--muted);
}

/* the touching hands sit above the form as the section's centrepiece */
.contact-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* full-bleed: the arms reach the screen edges. .company clips x-overflow
   so the over-wide element can't add a scrollbar; align-items:center
   centres it on the viewport */
.contact-hands {
  position: relative;
  width: 100vw;
  max-width: 100vw;
  aspect-ratio: 804 / 294; /* svg is viewBox-only, see the dither notes */
}

/* each half is a clip window onto its side of the image */
.hand {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  overflow: hidden;
  opacity: 0;
  transition:
    transform 950ms var(--ease-out-expo),
    opacity 480ms var(--ease-out);
}

.hand img {
  position: absolute;
  top: 0;
  height: 100%;
  width: 200%; /* the full image spans both halves */
  max-width: none;
}

.hand-l {
  left: 0;
  transform: translateX(-104%);
}

.hand-l img {
  left: 0;
}

.hand-r {
  right: 0;
  transform: translateX(104%);
}

.hand-r img {
  right: 0;
}

.contact-stage.shown .hand {
  opacity: 1;
  transform: translateX(0);
}

.contact-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px 20px;
  width: 100%;
  margin-top: 8px;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 700ms var(--ease-out) 160ms,
    transform 800ms var(--ease-out-expo) 160ms;
}

.contact-stage.shown .contact-form {
  opacity: 1;
  transform: translateY(0);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-wide {
  grid-column: 1 / -1;
}

.field-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--orange);
}

.field input,
.field select,
.field textarea {
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.02em;
  color: var(--ink);
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 0;
  padding: 12px;
  outline: none;
  transition: border-color 150ms var(--ease-out);
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--orange);
}

.field textarea {
  resize: vertical;
  min-height: 140px;
}

.contact-submit {
  grid-column: 1 / -1;
  justify-self: center;
  background: none;
  border: 2px solid var(--orange);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--orange);
  padding: 13px 42px;
  transition:
    background 150ms var(--ease-out),
    color 150ms var(--ease-out);
}

.contact-submit:hover {
  background: var(--orange);
  color: var(--paper);
}

@media (max-width: 640px) {
  .program {
    padding: 120px 20px 100px;
  }

  .program-title {
    margin-bottom: 52px;
  }

  .prog-block + .prog-block {
    margin-top: 72px;
  }

  .stats {
    gap: 26px 40px;
  }

  .services {
    padding: 0 20px 100px;
  }

  .services-title {
    margin-bottom: 40px;
  }

  .contact {
    padding: 0 20px 100px;
  }

  .contact-lead {
    margin-bottom: 32px;
  }

  .contact-form {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  /* tone the decorations down over the now full-width text */
  .nest {
    width: 84vw;
  }

  .prog-decor.shown .nest {
    opacity: 0.38;
  }

  .prog-decor.shown .prog-bee {
    opacity: 0.55;
  }
}

.stat {
  margin: 0;
  text-align: center;
}

.stat-num {
  font-family: var(--font-display);
  font-size: clamp(44px, 6vw, 72px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--orange);
}

.stat-label {
  margin: 12px 0 0;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  /* trails in just behind the figures as they start counting */
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 500ms var(--ease-out) 200ms,
    transform 600ms var(--ease-out-expo) 200ms;
}

.prog-block.shown .stat-label {
  opacity: 1;
  transform: translateY(0);
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
  overflow-y: auto; /* never clip links if a small screen runs out of room */
}

/* sized down from the student page's four-link menu — this one holds
   five, and the overlay clips overflow, so they must all fit on screen */
.menu-link {
  text-decoration: none;
  color: var(--ink);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(38px, 6.4vw, 84px);
  line-height: 1;
  letter-spacing: -0.02em;
  padding: min(2.6vh, 26px) 0;
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

.menu-link:nth-child(5) {
  animation-delay: 410ms;
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

/* the internet tower rises from the bottom of the hero and fades into
   the paper at its base; the whole scene shares the hero's rise-in */
.tower-scene {
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation: hands-in 1800ms var(--ease-out-expo) 300ms both;
}

.tower-wrap {
  position: absolute;
  bottom: 0;
  left: 57%;
  transform: translateX(-50%);
  width: min(96vw, 900px);
  aspect-ratio: 820 / 462; /* svg viewBox — gives the box its height */
}

.tower {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  /* fade the tower into the paper toward the bottom edge */
  -webkit-mask-image: linear-gradient(to bottom, #000 56%, transparent 97%);
  mask-image: linear-gradient(to bottom, #000 56%, transparent 97%);
}

/* bees scattered across the hero — everywhere except over the tower
   (which sits along the bottom, centre-right). positioned relative to
   the full stage; sizes/rotations vary so the scatter looks organic. */
.bee {
  position: absolute;
  height: auto;
  opacity: 0.6; /* match the tower */
}

.bee-1 {
  left: 7%;
  top: 12%;
  width: clamp(22px, 3vw, 44px);
  transform: rotate(-14deg);
}

.bee-2 {
  left: 22%;
  top: 27%;
  width: clamp(16px, 2.3vw, 32px);
  transform: scaleX(-1) rotate(20deg);
}

.bee-3 {
  left: 38%;
  top: 9%;
  width: clamp(20px, 2.7vw, 40px);
  transform: rotate(-28deg);
}

.bee-4 {
  left: 53%;
  top: 21%;
  width: clamp(15px, 2vw, 28px);
  transform: scaleX(-1) rotate(24deg);
}

.bee-5 {
  left: 66%;
  top: 8%;
  width: clamp(22px, 3vw, 44px);
  transform: rotate(12deg);
}

.bee-6 {
  left: 81%;
  top: 23%;
  width: clamp(17px, 2.4vw, 34px);
  transform: scaleX(-1) rotate(-16deg);
}

.bee-7 {
  left: 92%;
  top: 40%;
  width: clamp(15px, 2vw, 28px);
  transform: rotate(34deg);
}

.bee-8 {
  left: 13%;
  top: 47%;
  width: clamp(20px, 2.7vw, 40px);
  transform: scaleX(-1) rotate(-10deg);
}

.bee-9 {
  left: 5%;
  top: 72%;
  width: clamp(15px, 2vw, 28px);
  transform: rotate(-40deg);
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

/* secondary hero action — ink at rest so the services CTA leads */
.cta-secondary {
  color: var(--ink);
}

.cta-secondary:hover {
  color: var(--orange);
}

/* ============ Entrance ============ */
/* everything (including animation delays) waits for the intro handoff */
.hero.intro-wait .nav,
.hero.intro-wait .meta,
.hero.intro-wait .eyebrow,
.hero.intro-wait .headline,
.hero.intro-wait .lead,
.hero.intro-wait .ctas,
.hero.intro-wait .tower-scene {
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
  .tower-scene,
  .menu-overlay,
  .menu-link,
  .menu-flower {
    animation: none;
  }

  /* nest + program bees are shown immediately, no rise-in or ambient
     sway/hover */
  .nest,
  .prog-bee {
    transition: none;
  }

  .pb-img {
    animation: none;
  }

  /* text/labels land fully formed (the script skips the counting) */
  .prog-subtitle,
  .prog-lead,
  .stat-label {
    transition: none;
    opacity: 1;
    transform: none;
  }

  .svc-card {
    transition: none;
    opacity: 1;
    transform: none;
  }

  .svc-comb {
    transition: none;
    opacity: 0.4;
  }

  .svc-overlay,
  .svc-modal {
    animation: none;
  }

  .hand,
  .contact-form {
    transition: none;
    opacity: 1;
    transform: none;
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

}
</style>
