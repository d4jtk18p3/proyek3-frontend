FROM node:16-alpine as build

COPY . /usr/src/frontend
WORKDIR /usr/src/frontend

RUN npm ci \
 && npm run build

FROM nginx:1-alpine

COPY --from=build /usr/src/frontend/dist /usr/src/frontend
COPY src/nginx.conf /etc/nginx/nginx.conf
