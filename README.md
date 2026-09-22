# Datateknologer

The website for DAG, the company relations committee at
Datateknologsektionen, Chalmers — live at
[datateknologer.se](https://datateknologer.se).

| Folder      | What it is                                              |
| ----------- | ------------------------------------------------------- |
| `web-next/` | **The site** (Vue 3 + Vite). See `web-next/README.md`.  |
| `backend/`  | Events/registration API (Express + Prisma + Postgres).  |

## How to edit the site

Everything is documented in **`web-next/README.md`**:

- Board members → `web-next/src/content/board.ts`
- Contact emails & links → `web-next/src/content/site.ts`
- Page texts (always Swedish **and** English) → the `copy` object in
  each view under `web-next/src/views/`
- Events are managed through the backend's admin API — see the
  *Events* section of `web-next/README.md`

## Deploying

See **`DEPLOYMENT.md`** — server setup for datateknologer.se, HTTPS,
and how the admin password is set, used and rotated. Day-to-day
deploys: push to git, run `./sync.sh` on the server.
