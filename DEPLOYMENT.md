# Deploying datateknologer.se

The whole site runs as one Docker Compose stack: **Postgres**, the
**backend** (`app`), and **Caddy** (`web`) which serves the SPA, proxies
the API, and terminates HTTPS. Caddy fetches and renews the Let's
Encrypt certificate on its own — there is no separate TLS layer to set
up.

## Prerequisites

- A server with a public IP, Docker + Docker Compose installed, and
  **ports 80 and 443 open** to the internet.
- SSH access to it.

## 1. Point the domain at the server

In the DNS for `datateknologer.se`, create two `A` records → the
server's IPv4:

| Name  | Type | Value            |
| ----- | ---- | ---------------- |
| `@`   | A    | your.server.ip   |
| `www` | A    | your.server.ip   |

**Do this first** and wait for it to resolve (`dig +short
datateknologer.se`). Caddy requests the certificate on first start,
which only succeeds once DNS points here.

## 2. Get the code on the server

```bash
git clone <repo-url> datateknologer
cd datateknologer
```

## 3. Create the two secret files

Both are gitignored — they live only on the server.

```bash
cp docker-compose.example.yml docker-compose.yml
cp backend/config.example.json backend/config.json
```

**`docker-compose.yml`** — replace both `CHANGE_ME_DB_PASSWORD`
occurrences with the same real password, and confirm

```yaml
SITE_ADDRESS: "datateknologer.se, www.datateknologer.se"
```

**`backend/config.json`** — fill in:

- `admin_password` — used to log into the admin panel
- `email.user` / `email.pass` — the SMTP account that sends ticket
  confirmation mail

Leave `"host": "0.0.0.0"` and `"port": 10016` as they are — Caddy
proxies the API to `app:10016`.

## 4. Launch

```bash
docker compose up -d --build
```

That builds both images and starts everything. On first start:

- the backend runs `prisma db push` and **creates the database tables
  automatically** (it retries until Postgres is ready), then starts the
  API;
- Caddy requests the TLS certificate for the domain.

No manual database step is needed.

## 5. Verify

```bash
curl -I https://datateknologer.se            # expect HTTP/2 200
docker compose logs web | grep -i certificate # cert obtained
docker compose logs app | grep -i "Server started"
```

Then open the site and smoke-test: events list, a registration, both
language toggles, the contact forms, and the admin login.

## Day-to-day deploys

`sync.sh` on the server does `git pull` → rebuild → `docker compose up
-d`:

```bash
./sync.sh
```

Because the backend re-runs `prisma db push` on every start, additive
schema changes apply themselves on the next deploy. A **destructive**
change (dropping a column/table) makes push fail and the container stop
on purpose — handle those manually rather than losing data silently.

## Notes & troubleshooting

- **Certificate won't issue** — DNS isn't pointing at the server yet, or
  port 80/443 is blocked. Caddy needs both reachable. Check
  `docker compose logs web`.
- **`/api/*` returns 502** — the backend isn't up. Check
  `docker compose logs app`; a `P1001` there means it can't reach
  Postgres (it will keep retrying).
- **Apple Silicon** — the backend image only builds for `linux/amd64`
  (Prisma 4 has no arm64 engine). The production server is amd64, so
  this only matters if you build locally on a Mac: add
  `--platform linux/amd64`.
- **Behind an existing reverse proxy** — if the server already
  terminates TLS elsewhere, drop `SITE_ADDRESS` and the `443` port
  mapping from `docker-compose.yml` and point that proxy at the `web`
  container's port 80.
- **Database backup** — `docker compose exec postgres pg_dump -U root
  -d dag > backup.sql`.
- The `backend/scripts/` files are stale leftovers from another project
  (they mention `redis`, `course-portal`) — ignore them.
