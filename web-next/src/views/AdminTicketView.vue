<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  checkAuth,
  signIn,
  verifyTicket,
  type VerifyResult,
} from "@/api/admin";

/* Door check-in: scanning a ticket QR opens this page. Verifying marks
   the ticket as attended, so a second scan of the same code shows the
   holder again but the crew knows it was already used only via the
   first scan — treat "valid" as single-admission. Needs the admin
   password once per device (stored, like the old site). */

const route = useRoute();
const code = route.params.code as string;

const state = ref<"checking" | "signin" | "verifying" | "done" | "error">(
  "checking",
);
const password = ref("");
const signinFailed = ref(false);
const result = ref<VerifyResult | null>(null);

const verify = async () => {
  state.value = "verifying";
  try {
    result.value = await verifyTicket(code);
    state.value = "done";
  } catch {
    state.value = "error";
  }
};

const trySignIn = async () => {
  signinFailed.value = false;
  if (await signIn(password.value)) {
    verify();
  } else {
    signinFailed.value = true;
  }
};

onMounted(async () => {
  if (await checkAuth()) verify();
  else state.value = "signin";
});
</script>

<template>
  <div class="check">
    <p class="label">DAG — Ticket check</p>

    <form v-if="state === 'signin'" class="signin" @submit.prevent="trySignIn">
      <p class="signin-note">Admin password required to verify tickets.</p>
      <input
        v-model="password"
        type="password"
        placeholder="Admin password"
        autocomplete="current-password"
        required
      />
      <button type="submit">Sign in &amp; verify</button>
      <p v-if="signinFailed" class="bad-note">Wrong password.</p>
    </form>

    <p v-else-if="state === 'checking' || state === 'verifying'" class="wait">
      Verifying…
    </p>

    <template v-else-if="state === 'done' && result">
      <div class="verdict" :class="result.success ? 'ok' : 'bad'">
        {{ result.success ? "✓ Valid ticket" : "✗ Invalid ticket" }}
      </div>
      <dl v-if="result.success" class="details">
        <div>
          <dt>Event</dt>
          <dd>{{ result.event }}</dd>
        </div>
        <div>
          <dt>Attendee</dt>
          <dd>{{ result.attendee }}</dd>
        </div>
      </dl>
      <p v-if="result.success" class="hint">
        Marked as attended — a re-scan of this code still shows valid, so
        admit on first scan only.
      </p>
    </template>

    <template v-else-if="state === 'error'">
      <div class="verdict bad">Couldn't verify</div>
      <button class="retry" @click="verify">Try again</button>
    </template>
  </div>
</template>

<style scoped>
.check {
  min-height: 100svh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-mono);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  text-align: center;
}

.label {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--orange);
}

.wait {
  margin: 0;
  font-size: 15px;
  color: var(--muted);
}

.verdict {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(30px, 7vw, 44px);
  letter-spacing: -0.01em;
}

.verdict.ok {
  color: #1a7f37;
}

.verdict.bad {
  color: #b3261e;
}

.details {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.details dt {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--orange);
}

.details dd {
  margin: 2px 0 0;
  font-size: 17px;
}

.hint {
  margin: 0;
  max-width: 40ch;
  font-size: 12px;
  line-height: 1.6;
  color: var(--muted);
}

.signin {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: min(100%, 320px);
}

.signin-note {
  margin: 0;
  font-size: 13px;
  color: var(--ink);
}

.signin input {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 0;
  padding: 12px;
  outline: none;
}

.signin input:focus {
  border-color: var(--orange);
}

.signin button,
.retry {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--orange);
  background: none;
  border: 2px solid var(--orange);
  padding: 12px;
  cursor: pointer;
  transition:
    background 150ms var(--ease-out),
    color 150ms var(--ease-out);
}

.signin button:hover,
.retry:hover {
  background: var(--orange);
  color: var(--paper);
}

.bad-note {
  margin: 0;
  font-size: 13px;
  color: #b3261e;
}
</style>
