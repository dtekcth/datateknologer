FROM node:17-alpine AS compile
RUN mkdir /app && chown node:node /app
WORKDIR /app
RUN chown node:node ./
USER node
COPY --chown=node:node tsconfig.json package.json yarn.lock ./
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node src ./src
RUN yarn install
RUN npx prisma generate
RUN yarn ncc build src/index.ts -o dist/

FROM node:17-alpine AS final
# /uploads and /data hold uploaded images; create them owned by node so
# the named volumes mounted there inherit that ownership and the non-root
# app user can actually write (multer's temp dir + the served /data files)
RUN mkdir -p /app /uploads /data && chown -R node:node /app /uploads /data
WORKDIR /app
USER node
COPY --chown=node:node --from=compile /app/dist ./dist
# prisma schema + CLI + engines, so the entrypoint can create/sync the
# database schema on startup (there are no committed migrations — see
# docker-entrypoint.sh)
COPY --chown=node:node --from=compile /app/prisma ./prisma
COPY --chown=node:node --from=compile /app/node_modules/prisma ./node_modules/prisma
COPY --chown=node:node --from=compile /app/node_modules/@prisma ./node_modules/@prisma
COPY --chown=node:node docker-entrypoint.sh ./docker-entrypoint.sh
# the backend listens on config.port (10016 in the production config)
EXPOSE 10016
ENTRYPOINT ["sh", "./docker-entrypoint.sh"]