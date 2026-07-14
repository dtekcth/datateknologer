# Build + serve image for the DAG site.
#
# Stage 1 builds the Vue app; stage 2 serves the static bundle with
# Caddy, which also terminates TLS and proxies the API — so a single
# `web` container is the whole front door (no separate nginx or reverse
# proxy needed). Locally it just serves HTTP on :80; in production set
# SITE_ADDRESS to the domain and Caddy fetches/renews Let's Encrypt
# certificates automatically (see docker-compose.example.yml).
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine AS final
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80 443
# caddy:2-alpine already sets the entrypoint/CMD that runs the Caddyfile
