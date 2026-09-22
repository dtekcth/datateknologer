#!/bin/sh
# Sync the database schema, then start the server.
#
# There are no committed Prisma migrations, so `db push` is what creates
# the tables on the first launch against a fresh database. It's idempotent:
# on later restarts, when the schema already matches, it's a no-op. Only
# an additive change is applied automatically — a destructive one (dropping
# a column/table) makes push fail and the container stop, so that has to be
# a deliberate manual action rather than a silent data loss on deploy.
#
# depends_on doesn't wait for Postgres to accept connections, so retry until
# it does.
set -e

until node node_modules/prisma/build/index.js db push --schema prisma/schema.prisma --skip-generate; do
  echo "prisma db push failed (database not ready yet?) — retrying in 3s"
  sleep 3
done

exec node dist/index.js
