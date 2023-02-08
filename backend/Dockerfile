FROM node:16-alpine3.14 AS builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile && yarn build

EXPOSE 8081

ENTRYPOINT [ "node", "./dist/main.js" ]