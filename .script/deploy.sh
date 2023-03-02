#!/bin/bash

# docker-compose down
# docker-compose -p for_local down

git reset
git checkout .

git pull

yes | cp backend/.env.prod backend/.env

docker-compose up --build -d

sed -i 's/8081:/8083:/g' docker-compose.yml
sed -i 's/5432:/5433:/g' docker-compose.yml
yes | cp backend/.env.prod.for_local backend/.env

docker-compose -p for_local up -d backend

docker system prune -a -f