#!/usr/bin/env bash

git pull

cd backend
yarn docker:build

cd ../web
yarn docker:build

cd ..
docker-compose down
docker-compose up -d