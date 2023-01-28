#!/bin/bash

docker-compose down

git reset
git checkout .
git clean -fdx

git pull

yes | cp backend/.env.prod backend/.env

docker-compose up --build -d

docker system prune -a -f