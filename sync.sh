#!/usr/bin/env bash

git pull

cd backend
docker build . --tag dag-app:latest --target=final

cd ../web
docker build . --tag dag-web:latest --target=final

cd ..
docker-compose down
docker-compose up -d