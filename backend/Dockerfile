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

# FROM node:17-alpine AS production-deps
# RUN mkdir /app && chown node:node /app
# WORKDIR /app
# USER node
# COPY --chown=node:node package.json yarn.lock ./
# COPY --chown=node:node ./prisma ./prisma
# RUN yarn install --production

# FROM dev-deps AS compile
# WORKDIR /app
# USER node
# COPY --chown=node:node . ./
# RUN yarn build

FROM node:17-alpine AS final
RUN mkdir /app && chown node:node /app
WORKDIR /app
USER node
COPY --chown=node:node --from=compile /app/dist ./dist
CMD ["node", "dist/index.js"]