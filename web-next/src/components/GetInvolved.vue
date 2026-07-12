<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useLocale } from "@/composables/useLocale";
import RevealTitle from "@/components/RevealTitle.vue";
import { CONTACT } from "@/content/site";
import handsUrl from "@/assets/hands-touch-dither.webp";

/* "Get involved" — a simple form for students who want to join DAG.
   there's no membership endpoint on the backend, so the form composes
   an email to the committee via mailto. the address lives in
   src/content/site.ts (boardEmail). */
const CONTACT_EMAIL = CONTACT.boardEmail;

const { lang } = useLocale();

const name = ref("");
const email = ref("");
const message = ref("");
const sent = ref(false);

const submit = () => {
  const subject = `${copy.value.mailSubject} — ${name.value.trim()}`;
  const body =
    `${copy.value.nameLabel}: ${name.value.trim()}\n` +
    `${copy.value.emailLabel}: ${email.value.trim()}\n\n` +
    message.value.trim();
  window.location.href =
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
  sent.value = true;
};

/* the hands + form rise in on scroll and sink back out — the same
   reversible pattern as the board and titles */
const root = ref<HTMLElement | null>(null);
const shown = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !root.value) {
    shown.value = true;
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      shown.value = entries[entries.length - 1].isIntersecting;
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );
  observer.observe(root.value);
});

onBeforeUnmount(() => observer?.disconnect());

const copy = computed(() =>
  lang.value === "sv"
    ? {
        title: "Delta",
        lead: "Vill du vara med och forma DAG — planera event, nå ut till företag eller bara hjälpa till? Berätta lite om dig själv, så hör vi av oss.",
        nameLabel: "Namn",
        emailLabel: "E-post",
        messageLabel: "Vad vill du hjälpa till med?",
        submit: "Skicka",
        mailSubject: "Jag vill delta i DAG",
        sentNote: "Öppnar din e-postapp — skicka mejlet för att slutföra.",
      }
    : {
        title: "Get involved",
        lead: "Want to help shape DAG — plan events, reach out to companies, or just lend a hand? Tell us a bit about yourself and we'll get back to you.",
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "What would you like to help with?",
        submit: "Send",
        mailSubject: "I'd like to get involved with DAG",
        sentNote: "Opening your email app — send the message to finish.",
      },
);
</script>

<template>
  <section id="delta" class="involved">
    <RevealTitle class="involved-title" :text="copy.title" />
    <p class="lead">{{ copy.lead }}</p>

    <div ref="root" class="stage" :class="{ shown }">
      <!-- the same image split down the middle: each half slides in from
           its own side and the two meet to form the touching hands -->
      <div class="hands" aria-hidden="true">
        <span class="hand hand-l"><img :src="handsUrl" alt="" /></span>
        <span class="hand hand-r"><img :src="handsUrl" alt="" /></span>
      </div>

      <form class="form" @submit.prevent="submit">
        <div class="fields">
          <label class="field">
            <span>{{ copy.nameLabel }}</span>
            <input v-model="name" type="text" required maxlength="120" />
          </label>
          <label class="field">
            <span>{{ copy.emailLabel }}</span>
            <input v-model="email" type="email" required maxlength="200" />
          </label>
        </div>

        <label class="field">
          <span>{{ copy.messageLabel }}</span>
          <textarea v-model="message" rows="4" maxlength="1200" />
        </label>

        <button class="submit" type="submit">{{ copy.submit }}</button>
        <p v-if="sent" class="sent-note" role="status">{{ copy.sentNote }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.involved {
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 24px 150px;
}

.involved-title {
  margin: 0 0 26px;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(34px, 4.6vw, 56px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--orange);
  text-wrap: balance;
}

.lead {
  margin: 0 auto 8px;
  max-width: 56ch;
  text-align: center;
  font-size: 15px;
  line-height: 1.65;
  letter-spacing: 0.02em;
  color: var(--ink);
  text-wrap: balance;
}

/* the touching hands sit above the form as the section's centrepiece */
.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* full-bleed: the arms reach the screen edges. #app clips overflow, so
   100vw can't add a horizontal scrollbar. align-items:center on .stage
   centres the over-wide element on the viewport */
.hands {
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

.stage.shown .hand {
  opacity: 1;
  transform: translateX(0);
}

.form {
  width: min(100%, 520px);
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 700ms var(--ease-out) 160ms,
    transform 800ms var(--ease-out-expo) 160ms;
}

.stage.shown .hands,
.stage.shown .form {
  opacity: 1;
  transform: translateY(0);
}

/* name + email share a row on wide screens, stack on narrow */
.fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field span {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

input,
textarea {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 0;
  padding: 11px 12px;
  resize: vertical;
}

input:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: var(--orange);
}

.submit {
  align-self: center;
  margin-top: 4px;
  background: var(--orange);
  color: var(--paper);
  border: 2px solid var(--orange);
  padding: 13px 40px;
  cursor: pointer;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition:
    background 160ms var(--ease-out),
    border-color 160ms var(--ease-out);
}

.submit:hover {
  background: var(--orange-deep);
  border-color: var(--orange-deep);
}

.sent-note {
  margin: 0;
  text-align: center;
  font-size: 13px;
  line-height: 1.5;
  color: var(--orange-deep);
}

@media (prefers-reduced-motion: reduce) {
  .hand,
  .form {
    transition: none;
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 640px) {
  .involved {
    padding: 24px 20px 100px;
  }

  .fields {
    grid-template-columns: 1fr;
  }
}
</style>
