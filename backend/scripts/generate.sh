#!/bin/bash
docker-compose run -p 10006:10006 --rm app \
  yarn install

docker-compose run -p 10006:10006 --rm app \
  npx prisma generate --schema=prisma/schema.prisma
cp -r ./src/prisma/clients/* ./dist/prisma/clients/