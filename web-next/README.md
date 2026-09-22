# DAG website (web-next)

Vue 3 + Vite + TypeScript site for DAG — Datateknologsektionens
arbetsmarknadsgrupp at Chalmers. Three pages: a landing page
(student/company picker), the student page, and the company page.
Bilingual (`/en/...`, `/sv/...`).

## Quick start

```bash
npm install
npm run dev        # dev server on http://localhost:8765
npm run build      # typecheck (vue-tsc) + production build to dist/
npm run preview    # serve the production build locally
```

Events are fetched from the backend. In dev the site calls
`http://localhost:10016` (see *Backend* below); without a running
backend everything works except the event lists, which show a
retryable error state.

## Project layout

```
src/
  content/          ← EDITABLE SITE CONTENT (start here)
    board.ts          board members (names, roles, emails, photos)
    site.ts           contact emails, social links, org number
  api/
    events.ts         backend client (events list + registration)
  assets/             fonts, logos, dither illustrations
    board/            board member photos
  components/         shared building blocks
    AboutDag.vue        "About DAG" section (board grid + wave)
    GetInvolved.vue     student "Get involved" mail form
    SiteFooter.vue      footer (also holds the postal address)
    EventCard/EventModal/PastEventsModal   event UI
    IntroLoader.vue     the logo intro
    TransitionVeil.vue  page-transition whiteout
    RevealTitle.vue     scroll-reveal headings
  composables/        shared logic (locale, intro, transitions, …)
  router/index.ts     routes + page-transition wiring
  styles/             tokens.css (colors/spacing), fonts, base
  views/
    HomeView.vue        landing page (picker)
    StudentView.vue     student page (events live here)
    CompanyView.vue     company page (program, services, contact form)
```

## Editing content

### Board / committee members

Edit **`src/content/board.ts`** — it is self-documented. In short:

1. Put the new photo in `src/assets/board/` (portrait, roughly 3:4;
   ≥600px wide).
2. Import it at the top of `board.ts` and set it as the member's
   `photo`.
3. Update `name`, `email`, and `role` (both `en` and `sv`).

Array order = display order. Nothing else needs to change.

### Contact addresses, social links, org number

Edit **`src/content/site.ts`**:

- `CONTACT.companyEmail` — receives company inquiries (footer + the
  company page "Get in touch" form).
- `CONTACT.boardEmail` — receives student "Get involved" applications.
- `LINKS.instagram` / `LINKS.linkedin`, `ORG_NR`.

The postal address is in the footer template,
`src/components/SiteFooter.vue`.

### Page copy (headlines, paragraphs, services)

All user-facing text lives in a `copy` object near the top of each
view/component, with an `sv` and an `en` branch — **always update both
languages**. Notably:

- Company page (hero, program stats, the four services, contact-form
  labels): `src/views/CompanyView.vue`
- Student page (hero, menu, event labels): `src/views/StudentView.vue`
- Landing page: `src/views/HomeView.vue`

### Look & feel

- Colors, spacing, easing: `src/styles/tokens.css`
- Fonts: `src/styles/fonts.css` + `src/assets/fonts/`
- Dither illustrations: `src/assets/*.svg`. Note: several ship with
  only a `viewBox` (no width/height), so the CSS that places them sets
  an explicit `aspect-ratio` — keep that in sync if you swap artwork.

## Events — add, edit, remove

The site itself needs **no changes** when events come and go:

- The frontend calls `GET /api/v1/events` (public; returns all
  **non-archived** events, ascending by date).
- **Upcoming vs. past is automatic**: events with a date in the future
  render under "Upcoming events", the rest under "Past events". An
  event moves to "Past" by itself once its date passes.
- **Removing** an event from the site = archiving it in the backend
  (archived events are excluded from the public list).

### The admin panel

Events are managed in the built-in panel at **`/en/admin`** — sign in
with the admin password (see below). It covers:

- creating and editing events (all fields, incl. the optional extra
  ticket-mail text)
- uploading the **company logo** (the event image — it renders as the
  strip at the bottom of the event card; the upload control appears
  when editing a saved event)
- **archiving** (= removing from the site)
- the registration list per event (name, email, food preferences,
  attended)
- verifying a ticket code by hand

**Ticket flow:** a registration email links to `/en/ticket/<code>`
(that exact URL is baked into the backend's mail text), which shows a
QR code. Scanning it at the door opens `/en/admin/ticket/<code>`,
which — after a one-time sign-in on that device — marks the ticket
attended and shows who it belongs to.

The same operations are also available as a raw HTTP API:

| Action            | Endpoint                          | Admin |
| ----------------- | --------------------------------- | ----- |
| List (public)     | `GET /api/v1/events`              | no    |
| Upcoming (public) | `GET /api/v1/events/upcoming`     | no    |
| Create            | `POST /api/v1/events`             | yes   |
| Update            | `PATCH /api/v1/events`            | yes   |
| Archive (remove)  | `PATCH /api/v1/events/:id/archive`| yes   |
| Set image         | `PUT /api/v1/events/:id/image`    | yes   |
| Inspect one       | `GET /api/v1/events/:id`          | yes   |
| Verify a ticket   | `POST /api/v1/events/ticket/verify` | yes |
| Key check         | `GET /api/v1/auth`                | yes   |

### The admin key

Admin endpoints require the **admin password** from the backend's
config file (`admin_password` in `backend/config.dev.json` locally;
the production config on the server). It is sent **base64-encoded** in
a nonstandard header format:

```
Authorization: Token: <base64 of admin_password>
```

Keep that config file out of public repos — whoever has the password
can create/modify events and read registrations.

### Examples (curl)

```bash
BASE=http://localhost:10016/api/v1
TOKEN=$(printf '%s' 'THE_ADMIN_PASSWORD' | base64)
AUTH="Authorization: Token: $TOKEN"

# check the key
curl -H "$AUTH" $BASE/auth

# create an event (all dates ISO-8601)
curl -X POST $BASE/events -H "$AUTH" -H "Content-Type: application/json" -d '{
  "title": "Lunch lecture: ACME AB",
  "description": "Free food, great talk.",
  "date": "2026-09-15T12:00:00Z",
  "maxParticipants": 120,
  "registrationOpens": "2026-09-01T08:00:00Z",
  "registrationCloses": "2026-09-14T23:59:00Z",
  "foodWillBeServed": true
}'

# archive (remove from the site)
curl -X PATCH $BASE/events/42/archive -H "$AUTH"
```

(`mailTemplate` is an optional extra field on create/update.)

## "Get in touch" / "Get involved" forms — backend status

**There is no contact endpoint in the backend.** Its mailer
(nodemailer) is only used for event-registration tickets, and the
routes are: auth, events, jobs, profiles — no `/contact`.

So both forms work via **mailto**: submitting composes a prefilled
email in the visitor's own mail client —

- Company form → `CONTACT.companyEmail`, subject
  `"{Service} — {Company}"`, body containing all fields.
- Student form → `CONTACT.boardEmail`.

No server, no spam risk, but it depends on the visitor having a mail
client. If silent submissions are wanted later, add a small
`POST /contact` route to the backend (it already has nodemailer and
email credentials in its config) and swap the `submitContact` handler
in `CompanyView.vue` from `mailto:` to a `fetch` POST — it's isolated
in one function.

## Backend (for local development)

Lives in `../backend` (Express + Prisma, Dockerized).

- `docker compose up` serves it on **http://localhost:10016**
  (on Apple Silicon the image must be built for `linux/amd64`).
- Configuration: `backend/config.dev.json` — holds `admin_password`
  and the mail account used for ticket emails.
- First run needs the Prisma client generated and the database schema
  pushed: `docker compose run --rm app npx prisma generate` then
  `... npx prisma db push`. (In production this is automatic — the
  backend image runs `db push` on startup; see below.)

The frontend picks its API base automatically: in dev it targets
`http://localhost:10016`, in production it uses same-origin `/api/v1`
(so the built site should be served behind the same host as the
backend, or a reverse proxy that forwards `/api/v1` and `/public`).

## Deployment

This folder ships its own `Dockerfile` (node build → **Caddy**) and a
`Caddyfile`, so the `web` container is the whole front door: it serves
the SPA, proxies the API, **and** terminates HTTPS. The server's
`sync.sh` + docker-compose flow builds and runs it (see
`docker-compose.example.yml` at the repo root).

The bundled Caddyfile handles what the SPA needs:

- **history-mode fallback** — every unknown path serves `index.html`
  (the old `/sv → index_sv.html` rule is obsolete; the new router
  handles languages itself)
- **gzip + zstd compression** — the dither illustrations compress
  ~10:1; without this the student page ships ~4&nbsp;MB of art
- **immutable caching** for hashed `/assets/`, no-cache for the entry
  `index.html` so deploys take effect immediately

Caddy also **proxies `/api/v1` and `/public` to the backend container
itself** (compose service name `app`), and **obtains/renews Let's
Encrypt certificates automatically** when `SITE_ADDRESS` is set to the
domain. Locally (no `SITE_ADDRESS`) it just serves plain HTTP on `:80`,
so `docker run -p 8080:80 <image>` works with no extra setup. If the
server already has its own TLS-terminating proxy, drop `SITE_ADDRESS`
and point that proxy at this container's port 80.

The backend image **creates/syncs the database schema on startup**
(`prisma db push`, since there are no committed migrations), so a fresh
server needs no manual database step.

### Server setup

The complete step-by-step guide — DNS, secrets, HTTPS, admin password
setup and rotation, troubleshooting — lives in
**[`../DEPLOYMENT.md`](../DEPLOYMENT.md)** (repo root). The short
version: copy `docker-compose.example.yml` → `docker-compose.yml` and
`backend/config.example.json` → `backend/config.json`, fill in the
passwords and domain, then `docker compose up -d --build`.

### Before launch — checklist

1. ~~Set the real domain~~ — done: meta tags point at
   `https://datateknologer.se/`.
2. **Backend production config** on the server (step-by-step above).
3. **Commit and push** — `sync.sh` deploys from git.
4. Smoke-test on a phone (Safari + Chrome): intro animation, events
   list, registration, both language toggles, the contact forms.
