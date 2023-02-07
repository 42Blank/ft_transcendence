FROM node:16-alpine3.14 AS builder

ARG REACT_APP_SERVER

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]