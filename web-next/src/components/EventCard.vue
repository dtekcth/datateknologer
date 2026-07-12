<script setup lang="ts">
import { computed } from "vue";
import { publicImage, type ApiEvent } from "@/api/events";
import { useLocale } from "@/composables/useLocale";
import bbqUrl from "@/assets/bbq-dither.webp";
import auditoriumUrl from "@/assets/auditorium-dither.webp";
import rpiUrl from "@/assets/rpi-dither.webp";
import writingUrl from "@/assets/writing-dither.webp";

const props = defineProps<{ event: ApiEvent; past?: boolean }>();

/* the whole card opens the event detail dialog (article + role=button
   rather than a real <button>, which can't contain the heading) */
const emit = defineEmits<{ open: [] }>();

/* the backend has no event-type field, so the card's themed illustration
   is inferred from keywords in the title + description (en + sv) */
const art = computed(() => {
  const t = `${props.event.title} ${props.event.description}`.toLowerCase();
  if (/\b(bbq|barbec|barbeq|grill)/.test(t))
    return { src: bbqUrl, kind: "bbq" };
  if (t.includes("lunch") && /(lecture|föreläs|forelas)/.test(t))
    return { src: auditoriumUrl, kind: "lecture" };
  if (/\b(workshop|verkstad)/.test(t))
    return { src: rpiUrl, kind: "workshop" };
  if (/\bcase/.test(t) && /(evening|night|kväll|kvall|afton)/.test(t))
    return { src: writingUrl, kind: "case" };
  return null;
});

const { lang } = useLocale();

const when = computed(() => {
  const d = new Date(props.event.date);
  const locale = lang.value === "sv" ? "sv-SE" : "en-GB";
  const date = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
  return `${date} · ${time}`;
});

/* the backend has no company field — the event image is the host
   company's logo, so it stands in as the company on the card */
const logo = computed(() =>
  props.event.imageUrl ? publicImage(props.event.imageUrl) : null,
);
</script>

<template>
  <article
    class="card"
    :class="{ past }"
    role="button"
    tabindex="0"
    :aria-label="event.title"
    @click="emit('open')"
    @keydown.enter.prevent="emit('open')"
    @keydown.space.prevent="emit('open')"
  >
    <p class="when">{{ when }}</p>
    <h3 class="title">{{ event.title }}</h3>
    <div v-if="art" class="art" :class="`art-${art.kind}`">
      <img :src="art.src" alt="" aria-hidden="true" loading="lazy" />
    </div>
    <div v-if="logo" class="logo">
      <img :src="logo" alt="" loading="lazy" />
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  border: 2px solid var(--ink);
  /* opaque so the robot dither behind the section reads only in the
     gaps between cards, not through the card text */
  background: var(--paper);
  padding: 20px 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 300px;
  /* keep the oversized corner illustration inside the card frame */
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 160ms var(--ease-out),
    box-shadow 160ms var(--ease-out);
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 5px 5px 0 var(--orange);
}

.card:focus-visible {
  outline: 3px solid var(--orange);
  outline-offset: 3px;
}

.when {
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--orange);
}

.title {
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.15;
  color: var(--ink);
  text-wrap: balance;
}

/* themed dither illustration anchored to the bottom-right corner and
   sized large; it sits behind the card text (which is lifted above it) */
.art {
  position: absolute;
  right: -8px;
  bottom: -8px;
  width: 118%;
  z-index: 0;
  line-height: 0;
  pointer-events: none;
  user-select: none;
}

.art img {
  width: 100%;
  height: auto;
  opacity: 0.9;
  /* solid at the bottom-right corner, feathering toward the top-left so
     the corner melts into the paper */
  -webkit-mask-image: radial-gradient(
    140% 140% at 100% 100%,
    #000 50%,
    transparent 84%
  );
  mask-image: radial-gradient(
    140% 140% at 100% 100%,
    #000 50%,
    transparent 84%
  );
}

/* the raspberry pi (workshop) art spans the full bottom of the card —
   reaching both bottom corners — and is shown unfaded */
.art-workshop {
  left: -100px;
  right: -100px;
  width: auto;
}

.art-workshop img {
  -webkit-mask-image: none;
  mask-image: none;
}

/* the writing (case) and lecture-hall art are sized up so they climb to
   the title, where the corner fade keeps the heading readable */
.art-lecture {
  width: 150%;
}

.art-case {
  width: 172%;
}

/* because these climb up behind the heading, add a second top-down fade
   (intersected with the corner fade) so they dissolve harder near the
   title and keep it legible */
.art-lecture img,
.art-case img {
  -webkit-mask-image:
    radial-gradient(140% 140% at 100% 100%, #000 50%, transparent 84%),
    linear-gradient(to bottom, transparent 0%, #000 46%);
  -webkit-mask-composite: source-in;
  mask-image:
    radial-gradient(140% 140% at 100% 100%, #000 50%, transparent 84%),
    linear-gradient(to bottom, transparent 0%, #000 46%);
  mask-composite: intersect;
}

/* multiply blends white logo backgrounds into the paper; grayscale
   keeps foreign brand colors out of the palette */
.logo {
  position: relative;
  z-index: 1;
  margin-top: auto;
  padding-top: 8px;
}

.logo img {
  max-height: 34px;
  max-width: 60%;
  width: auto;
  object-fit: contain;
  mix-blend-mode: multiply;
  filter: grayscale(1) contrast(1.05);
  opacity: 0.85;
}

/* dim past cards per-part — a group opacity would isolate the card
   and break the logo's multiply blend against the page background */
.card.past {
  border-color: color-mix(in srgb, var(--muted) 55%, var(--paper));
}

/* past cards stay flat but still read as clickable */
.card.past:hover {
  transform: none;
  box-shadow: 4px 4px 0 color-mix(in srgb, var(--muted) 45%, var(--paper));
  border-color: var(--muted);
}

.card.past .when,
.card.past .title {
  color: var(--muted);
}

.card.past .logo img {
  opacity: 0.4;
}

/* past-event illustrations drop their orange and read as gray */
.card.past .art img {
  opacity: 0.45;
  filter: grayscale(1);
}
</style>
