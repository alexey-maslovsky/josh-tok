FROM node:16.13.0-alpine3.14 AS build

WORKDIR /usr/src/app
ENV PATH /node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci --silent --prefer-offline --no-audit
COPY . ./
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine

WORKDIR /www/data
COPY --from=build /usr/src/app/build .
COPY ./nginx/config/server.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
