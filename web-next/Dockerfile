# Build + serve image for the new DAG site. Drop-in replacement for the
# old `web` service: same two-stage shape (node build → nginx serving
# dist on :80), so the server's docker-compose only needs its build
# context pointed at ./web-next instead of ./web.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS final
COPY ./nginx/ /etc/nginx/
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
