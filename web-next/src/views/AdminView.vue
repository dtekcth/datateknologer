<script setup lang="ts">
import { onMounted, ref } from "vue";
import { format, parseISO } from "date-fns";
import { fetchEvents, publicImage, type ApiEvent } from "@/api/events";
import {
  archiveEvent,
  checkAuth,
  createEvent,
  getEventWithTickets,
  signIn,
  signOut,
  updateEvent,
  uploadEventImage,
  verifyTicket,
  type AdminTicket,
  type VerifyResult,
} from "@/api/admin";

/* Committee admin panel (English only, like the old one):
   sign in with the shared admin password, then create / edit / archive
   events, see who registered, and verify a ticket code by hand.
   Door check-in via QR scan lands on /en/admin/ticket/<code> instead. */

/* ---- auth ---- */
const authed = ref<"checking" | "no" | "yes">("checking");
const password = ref("");
const signinFailed = ref(false);

const trySignIn = async () => {
  signinFailed.value = false;
  if (await signIn(password.value)) {
    authed.value = "yes";
    password.value = "";
    loadEvents();
  } else {
    signinFailed.value = true;
  }
};

const doSignOut = () => {
  signOut();
  authed.value = "no";
};

/* ---- events ---- */
const events = ref<ApiEvent[]>([]);
const eventsError = ref(false);

const loadEvents = async () => {
  eventsError.value = false;
  try {
    events.value = await fetchEvents();
  } catch {
    eventsError.value = true;
  }
};

/* ---- create / edit form ---- */
const mode = ref<"list" | "create" | "edit">("list");
const editingId = ref<number | null>(null);
const tickets = ref<AdminTicket[]>([]);
const saving = ref(false);
const formError = ref("");

const fTitle = ref("");
const fDescription = ref("");
const fDate = ref("");
const fRegOpens = ref("");
const fRegCloses = ref("");
const fMaxParticipants = ref(100);
const fFood = ref(false);
const fMailTemplate = ref("");

/* company logo (the event image) — upload lives on the edit form since
   the backend needs an event id to attach it to */
const currentImageUrl = ref<string | null>(null);
const logoFile = ref<File | null>(null);
const uploading = ref(false);
const logoError = ref("");

const onLogoPick = (e: Event) => {
  logoError.value = "";
  const file = (e.target as HTMLInputElement).files?.[0] ?? null;
  if (file && file.size > 10 * 1000 * 1000) {
    logoError.value = "File too big (max 10 MB).";
    logoFile.value = null;
    return;
  }
  logoFile.value = file;
};

const doUploadLogo = async () => {
  if (editingId.value === null || !logoFile.value) return;
  uploading.value = true;
  logoError.value = "";
  try {
    const ev = await uploadEventImage(editingId.value, logoFile.value);
    currentImageUrl.value = ev.imageUrl;
    logoFile.value = null;
    await loadEvents();
  } catch {
    logoError.value = "Upload failed.";
  } finally {
    uploading.value = false;
  }
};

/* datetime-local <-> ISO */
const isoToLocal = (iso: string) =>
  format(parseISO(iso), "yyyy-MM-dd'T'HH:mm");
const localToIso = (v: string) => new Date(v).toISOString();

const openCreate = () => {
  mode.value = "create";
  editingId.value = null;
  formError.value = "";
  fTitle.value = "";
  fDescription.value = "";
  fDate.value = "";
  fRegOpens.value = "";
  fRegCloses.value = "";
  fMaxParticipants.value = 100;
  fFood.value = false;
  fMailTemplate.value = "";
};

const openEdit = async (ev: ApiEvent) => {
  mode.value = "edit";
  editingId.value = ev.id;
  formError.value = "";
  fTitle.value = ev.title;
  fDescription.value = ev.description;
  fDate.value = isoToLocal(ev.date);
  fRegOpens.value = isoToLocal(ev.registrationOpens);
  fRegCloses.value = isoToLocal(ev.registrationCloses);
  fMaxParticipants.value = ev.maxParticipants;
  fFood.value = ev.foodWillBeServed;
  fMailTemplate.value = ev.mailTemplate ?? "";
  currentImageUrl.value = ev.imageUrl;
  logoFile.value = null;
  logoError.value = "";
  tickets.value = [];
  try {
    tickets.value = (await getEventWithTickets(ev.id)).tickets;
  } catch {
    /* attendee list is non-critical — the form still works */
  }
};

const closeForm = () => {
  mode.value = "list";
  editingId.value = null;
};

const save = async () => {
  saving.value = true;
  formError.value = "";
  const args = {
    title: fTitle.value,
    description: fDescription.value,
    date: localToIso(fDate.value),
    registrationOpens: localToIso(fRegOpens.value),
    registrationCloses: localToIso(fRegCloses.value),
    maxParticipants: Number(fMaxParticipants.value),
    foodWillBeServed: fFood.value,
    ...(fMailTemplate.value ? { mailTemplate: fMailTemplate.value } : {}),
  };
  try {
    if (mode.value === "create") await createEvent(args);
    else if (editingId.value !== null)
      await updateEvent({ id: editingId.value, ...args });
    await loadEvents();
    closeForm();
  } catch {
    formError.value = "Saving failed — check the fields and your sign-in.";
  } finally {
    saving.value = false;
  }
};

const archive = async (ev: ApiEvent) => {
  if (!window.confirm(`Archive "${ev.title}"? It disappears from the site.`))
    return;
  try {
    await archiveEvent(ev.id);
    await loadEvents();
    if (editingId.value === ev.id) closeForm();
  } catch {
    formError.value = "Archiving failed.";
  }
};

/* ---- manual ticket check ---- */
const codeInput = ref("");
const verifyResult = ref<VerifyResult | null>(null);
const verifyError = ref(false);

const doVerify = async () => {
  verifyError.value = false;
  verifyResult.value = null;
  try {
    verifyResult.value = await verifyTicket(codeInput.value.trim());
  } catch {
    verifyError.value = true;
  }
};

onMounted(async () => {
  if (await checkAuth()) {
    authed.value = "yes";
    loadEvents();
  } else {
    authed.value = "no";
  }
});
</script>

<template>
  <div class="admin">
    <!-- ============ sign in ============ -->
    <div v-if="authed !== 'yes'" class="gate">
      <p class="label">DAG — Admin</p>
      <form
        v-if="authed === 'no'"
        class="signin"
        @submit.prevent="trySignIn"
      >
        <label class="field">
          <span class="field-label">Admin password</span>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </label>
        <button class="btn" type="submit">Sign in</button>
        <p v-if="signinFailed" class="error">Wrong password.</p>
      </form>
      <p v-else class="muted">Checking sign-in…</p>
    </div>

    <!-- ============ panel ============ -->
    <template v-else>
      <header class="bar">
        <p class="label">DAG — Admin</p>
        <button class="linkish" @click="doSignOut">Sign out</button>
      </header>

      <!-- list -->
      <section v-if="mode === 'list'" class="panel">
        <div class="row-between">
          <h1>Events</h1>
          <button class="btn" @click="openCreate">New event</button>
        </div>

        <p v-if="eventsError" class="error">
          Couldn't load events.
          <button class="linkish" @click="loadEvents">Retry</button>
        </p>
        <p v-else-if="events.length === 0" class="muted">
          No events (archived ones are hidden).
        </p>

        <ul class="event-list">
          <li v-for="ev in events" :key="ev.id" class="event-row">
            <div class="event-main">
              <span class="event-title">{{ ev.title }}</span>
              <span class="event-date">{{
                format(parseISO(ev.date), "yyyy-MM-dd HH:mm")
              }}</span>
            </div>
            <div class="event-actions">
              <button class="btn small" @click="openEdit(ev)">Edit</button>
              <button class="btn small danger" @click="archive(ev)">
                Archive
              </button>
            </div>
          </li>
        </ul>

        <div class="verify-box">
          <h2>Check a ticket code</h2>
          <form class="verify-form" @submit.prevent="doVerify">
            <input
              v-model="codeInput"
              type="text"
              placeholder="verification code"
              required
            />
            <button class="btn small" type="submit">Verify</button>
          </form>
          <p v-if="verifyError" class="error">Verification failed.</p>
          <p
            v-else-if="verifyResult"
            :class="verifyResult.success ? 'ok' : 'error'"
          >
            {{
              verifyResult.success
                ? `✓ Valid — ${verifyResult.attendee} (${verifyResult.event})`
                : "✗ Invalid ticket"
            }}
          </p>
        </div>
      </section>

      <!-- create / edit -->
      <section v-else class="panel">
        <div class="row-between">
          <h1>{{ mode === "create" ? "New event" : "Edit event" }}</h1>
          <button class="linkish" @click="closeForm">← Back to list</button>
        </div>

        <form class="form" @submit.prevent="save">
          <label class="field wide">
            <span class="field-label">Title</span>
            <input v-model="fTitle" type="text" required />
          </label>

          <label class="field wide">
            <span class="field-label">Description</span>
            <textarea v-model="fDescription" rows="5" required></textarea>
          </label>

          <label class="field">
            <span class="field-label">Event date &amp; time</span>
            <input v-model="fDate" type="datetime-local" required />
          </label>

          <label class="field">
            <span class="field-label">Max participants</span>
            <input
              v-model.number="fMaxParticipants"
              type="number"
              min="1"
              required
            />
          </label>

          <label class="field">
            <span class="field-label">Registration opens</span>
            <input v-model="fRegOpens" type="datetime-local" required />
          </label>

          <label class="field">
            <span class="field-label">Registration closes</span>
            <input v-model="fRegCloses" type="datetime-local" required />
          </label>

          <label class="check-field wide">
            <input v-model="fFood" type="checkbox" />
            <span>Food will be served</span>
          </label>

          <label class="field wide">
            <span class="field-label">
              Extra ticket-mail text (optional, html allowed)
            </span>
            <textarea v-model="fMailTemplate" rows="3"></textarea>
          </label>

          <!-- the event image = the host company's logo, shown as the
               strip at the bottom of the event card -->
          <div v-if="mode === 'edit'" class="field wide">
            <span class="field-label">
              Company logo (shown at the bottom of the event card)
            </span>
            <div class="logo-row">
              <img
                v-if="currentImageUrl"
                class="logo-preview"
                :src="publicImage(currentImageUrl)"
                alt="Current logo"
              />
              <span v-else class="muted">No logo yet.</span>
              <input type="file" accept="image/*" @change="onLogoPick" />
              <button
                v-if="logoFile"
                class="btn small"
                type="button"
                :disabled="uploading"
                @click="doUploadLogo"
              >
                {{ uploading ? "Uploading…" : "Upload" }}
              </button>
            </div>
            <p v-if="logoError" class="error">{{ logoError }}</p>
          </div>
          <p v-else class="wide muted">
            Save the event first — the company-logo upload appears when
            editing it.
          </p>

          <div class="wide row-between">
            <p v-if="formError" class="error">{{ formError }}</p>
            <span v-else></span>
            <button class="btn" type="submit" :disabled="saving">
              {{ saving ? "Saving…" : "Save" }}
            </button>
          </div>
        </form>

        <div v-if="mode === 'edit'" class="attendees">
          <h2>Registrations ({{ tickets.length }})</h2>
          <p v-if="tickets.length === 0" class="muted">No registrations yet.</p>
          <table v-else>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Food preferences</th>
                <th>Attended</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tickets" :key="t.email">
                <td>{{ t.name }}</td>
                <td>{{ t.email }}</td>
                <td>{{ t.foodPreferences || "—" }}</td>
                <td>{{ t.attended ? "✓" : "" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.admin {
  min-height: 100svh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-mono);
  padding: 0 24px 96px;
}

.gate {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
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

.bar {
  max-width: 860px;
  margin: 0 auto;
  padding: 26px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel {
  max-width: 860px;
  margin: 0 auto;
}

h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--orange);
}

h2 {
  margin: 0 0 14px;
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 700;
  color: var(--ink);
}

.row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.muted {
  color: var(--muted);
  font-size: 14px;
}

.ok {
  color: #1a7f37;
  font-size: 14px;
}

.error {
  color: #b3261e;
  font-size: 14px;
}

/* ---- buttons ---- */
.btn {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--orange);
  background: none;
  border: 2px solid var(--orange);
  padding: 11px 18px;
  cursor: pointer;
  transition:
    background 150ms var(--ease-out),
    color 150ms var(--ease-out);
}

.btn:hover {
  background: var(--orange);
  color: var(--paper);
}

.btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.btn.small {
  padding: 8px 12px;
  font-size: 11px;
}

.btn.danger {
  color: #b3261e;
  border-color: #b3261e;
}

.btn.danger:hover {
  background: #b3261e;
  color: var(--paper);
}

.linkish {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.linkish:hover {
  color: var(--orange);
}

/* ---- sign in / forms ---- */
.signin {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: min(100%, 340px);
}

.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wide {
  grid-column: 1 / -1;
}

.field-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--orange);
}

.field input,
.field textarea {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 0;
  padding: 11px 12px;
  outline: none;
}

.field input:focus,
.field textarea:focus {
  border-color: var(--orange);
}

.field textarea {
  resize: vertical;
}

.check-field {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
}

.check-field input {
  width: 18px;
  height: 18px;
  accent-color: var(--orange);
}

/* ---- event list ---- */
.event-list {
  list-style: none;
  margin: 0 0 48px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.event-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border: 2px solid var(--ink);
  padding: 14px 16px;
}

.event-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.event-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 17px;
}

.event-date {
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.06em;
}

.event-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

/* ---- verify box ---- */
.verify-box {
  border-top: 1px solid color-mix(in srgb, var(--ink) 25%, transparent);
  padding-top: 28px;
}

.verify-form {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.verify-form input {
  flex: 1;
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 0;
  padding: 10px 12px;
  outline: none;
}

.verify-form input:focus {
  border-color: var(--orange);
}

/* ---- logo upload ---- */
.logo-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.logo-preview {
  height: 44px;
  width: auto;
  max-width: 160px;
  object-fit: contain;
  border: 1px solid color-mix(in srgb, var(--ink) 25%, transparent);
  background: #fff;
  padding: 4px 8px;
}

.logo-row input[type="file"] {
  font-family: var(--font-mono);
  font-size: 12px;
}

/* ---- attendees ---- */
.attendees {
  margin-top: 48px;
}

.attendees table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.attendees th {
  text-align: left;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--orange);
  padding: 8px 10px;
  border-bottom: 2px solid var(--ink);
}

.attendees td {
  padding: 9px 10px;
  border-bottom: 1px solid color-mix(in srgb, var(--ink) 20%, transparent);
}

@media (max-width: 640px) {
  .form {
    grid-template-columns: 1fr;
  }

  .event-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .attendees {
    overflow-x: auto;
  }
}
</style>
