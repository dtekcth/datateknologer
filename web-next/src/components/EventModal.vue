<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import {
  publicImage,
  registerForEvent,
  RegisterError,
  type ApiEvent,
} from "@/api/events";
import { useLocale } from "@/composables/useLocale";

/* event detail dialog: full description for any card; upcoming events
   whose registration window is open also get the sign-up form, posting
   to the existing backend (POST /events/register — the ticket itself
   arrives by email). the parent keys this component by event id, so
   all form state resets when another card is opened. */

const props = defineProps<{ event: ApiEvent; past?: boolean }>();
const emit = defineEmits<{ close: [] }>();

const { lang } = useLocale();
const locale = computed(() => (lang.value === "sv" ? "sv-SE" : "en-GB"));

const panel = ref<HTMLElement | null>(null);

const longDate = (iso: string, withTime = true) => {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat(locale.value, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
  if (!withTime) return date;
  const time = new Intl.DateTimeFormat(locale.value, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
  return `${date} · ${time}`;
};

const when = computed(() => longDate(props.event.date));

/* the backend doesn't enforce the registration window — gate it here */
const regState = computed<"open" | "before" | "closed" | "past">(() => {
  if (props.past) return "past";
  const now = Date.now();
  if (now < new Date(props.event.registrationOpens).getTime()) return "before";
  if (now > new Date(props.event.registrationCloses).getTime())
    return "closed";
  return "open";
});

const logo = computed(() =>
  props.event.imageUrl ? publicImage(props.event.imageUrl) : null,
);

/* ============ Registration form ============ */
const name = ref("");
const email = ref("");
const food = ref("");
const submitting = ref(false);
const registered = ref(false);
const errorMsg = ref("");

const submit = async () => {
  if (submitting.value) return;
  errorMsg.value = "";
  submitting.value = true;
  try {
    await registerForEvent({
      id: props.event.id,
      name: name.value.trim(),
      email: email.value.trim(),
      foodPreferences: food.value.trim() || undefined,
    });
    registered.value = true;
  } catch (e) {
    if (e instanceof RegisterError && e.has("ALREADY_REGISTERED")) {
      errorMsg.value = copy.value.errAlready;
    } else if (e instanceof RegisterError && e.has("MAX_PARTICIPANTS_REACHED")) {
      errorMsg.value = copy.value.errFull;
    } else {
      errorMsg.value = copy.value.errGeneric;
    }
  } finally {
    submitting.value = false;
  }
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") emit("close");
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  panel.value?.focus();
});
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

const copy = computed(() =>
  lang.value === "sv"
    ? {
        close: "Stäng",
        food: "Mat serveras",
        pastNote: "Det här eventet har redan ägt rum.",
        opensAt: (d: string) => `Anmälan öppnar ${d}.`,
        closedNote: "Anmälan har stängt.",
        formTitle: "Anmäl dig",
        nameLabel: "Namn",
        emailLabel: "E-post",
        foodLabel: "Matpreferenser (allergier, vegetariskt …)",
        submit: "Anmäl mig",
        submitting: "Skickar …",
        doneTitle: "Du är anmäld!",
        doneNote: (mail: string) =>
          `Din biljett har skickats till ${mail}. Ta med den till eventet.`,
        errAlready: "Den här e-postadressen är redan anmäld till eventet.",
        errFull: "Eventet är tyvärr fullbokat.",
        errGeneric: "Något gick fel — försök igen om en stund.",
      }
    : {
        close: "Close",
        food: "Food will be served",
        pastNote: "This event has already taken place.",
        opensAt: (d: string) => `Registration opens ${d}.`,
        closedNote: "Registration has closed.",
        formTitle: "Sign up",
        nameLabel: "Name",
        emailLabel: "Email",
        foodLabel: "Food preferences (allergies, vegetarian …)",
        submit: "Register",
        submitting: "Sending …",
        doneTitle: "You're in!",
        doneNote: (mail: string) =>
          `Your ticket has been sent to ${mail}. Bring it to the event.`,
        errAlready: "This email address is already registered for the event.",
        errFull: "Unfortunately the event is fully booked.",
        errGeneric: "Something went wrong — please try again in a moment.",
      },
);
</script>

<template>
  <Teleport to="body">
    <div class="backdrop" @click.self="emit('close')">
      <div
        ref="panel"
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-label="event.title"
        tabindex="-1"
      >
        <button class="close" :aria-label="copy.close" @click="emit('close')">
          <svg
            width="20"
            height="20"
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

        <p class="when">{{ when }}</p>
        <h3 class="title">{{ event.title }}</h3>
        <p v-if="event.foodWillBeServed && !past" class="food">
          ✳ {{ copy.food }}
        </p>

        <p class="desc">{{ event.description }}</p>

        <div v-if="logo" class="logo">
          <img :src="logo" alt="" loading="lazy" />
        </div>

        <!-- ============ Registration ============ -->
        <div v-if="regState === 'open'" class="register">
          <template v-if="!registered">
            <h4 class="form-title">{{ copy.formTitle }}</h4>
            <form @submit.prevent="submit">
              <label>
                <span>{{ copy.nameLabel }}</span>
                <input v-model="name" type="text" required maxlength="120" />
              </label>
              <label>
                <span>{{ copy.emailLabel }}</span>
                <input v-model="email" type="email" required maxlength="200" />
              </label>
              <label v-if="event.foodWillBeServed">
                <span>{{ copy.foodLabel }}</span>
                <input v-model="food" type="text" maxlength="300" />
              </label>

              <p v-if="errorMsg" class="error" role="alert">{{ errorMsg }}</p>

              <button class="submit" type="submit" :disabled="submitting">
                {{ submitting ? copy.submitting : copy.submit }}
              </button>
            </form>
          </template>

          <div v-else class="done" role="status">
            <h4 class="form-title">{{ copy.doneTitle }}</h4>
            <p>{{ copy.doneNote(email.trim()) }}</p>
          </div>
        </div>

        <p v-else-if="regState === 'before'" class="reg-note">
          {{ copy.opensAt(longDate(event.registrationOpens, false)) }}
        </p>
        <p v-else-if="regState === 'closed'" class="reg-note">
          {{ copy.closedNote }}
        </p>
        <p v-else class="reg-note">{{ copy.pastNote }}</p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 6; /* above the full-screen menu (5) */
  background: color-mix(in srgb, var(--ink) 40%, transparent);
  display: grid;
  place-items: center;
  padding: 24px;
  animation: backdrop-in 200ms var(--ease-out) both;
}

.modal {
  position: relative;
  width: min(560px, 100%);
  max-height: min(84vh, 720px);
  overflow-y: auto;
  background: var(--paper);
  border: 2px solid var(--ink);
  box-shadow: 8px 8px 0 var(--orange);
  padding: 30px 32px 28px;
  font-family: var(--font-mono);
  color: var(--ink);
  animation: modal-in 260ms var(--ease-out-expo) both;
}

.modal:focus {
  outline: none;
}

.close {
  position: absolute;
  top: 14px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--ink);
}

.close:hover {
  color: var(--orange);
}

.when {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--orange);
  padding-right: 40px;
}

.title {
  margin: 0 0 6px;
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.12;
  text-wrap: balance;
  padding-right: 24px;
}

.food {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--orange-deep);
}

.desc {
  margin: 14px 0 0;
  font-size: 14px;
  line-height: 1.65;
  letter-spacing: 0.01em;
  white-space: pre-line; /* keep paragraph breaks from the admin editor */
}

.logo {
  margin-top: 18px;
}

.logo img {
  max-height: 30px;
  max-width: 50%;
  object-fit: contain;
  mix-blend-mode: multiply;
  filter: grayscale(1) contrast(1.05);
  opacity: 0.85;
}

/* ============ Registration ============ */
.register {
  margin-top: 26px;
  border-top: 2px solid var(--ink);
  padding-top: 20px;
}

.form-title {
  margin: 0 0 14px;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label span {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

input {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 0;
  padding: 10px 12px;
}

input:focus-visible {
  outline: none;
  border-color: var(--orange);
}

.submit {
  align-self: flex-start;
  margin-top: 4px;
  background: var(--orange);
  color: var(--paper);
  border: 2px solid var(--orange);
  padding: 12px 26px;
  cursor: pointer;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    background 160ms var(--ease-out),
    border-color 160ms var(--ease-out);
}

.submit:hover:not(:disabled) {
  background: var(--orange-deep);
  border-color: var(--orange-deep);
}

.submit:disabled {
  opacity: 0.6;
  cursor: default;
}

.error {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--orange-deep);
}

.done p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

.reg-note {
  margin: 22px 0 0;
  font-size: 13px;
  letter-spacing: 0.02em;
  color: var(--muted);
}

@keyframes backdrop-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .backdrop,
  .modal {
    animation: none;
  }
}

@media (max-width: 640px) {
  .backdrop {
    padding: 14px;
  }

  .modal {
    padding: 24px 20px 22px;
    max-height: 88vh;
  }
}
</style>
