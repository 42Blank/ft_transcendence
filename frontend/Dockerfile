FROM node:16-alpine3.14 AS builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]