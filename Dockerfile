FROM node:18 as builder

WORKDIR /usr/src/app

COPY *.json ./
COPY *.js ./
COPY *.ts ./
COPY src src

RUN npm install -g npm
RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html

RUN true

COPY default.conf /etc/nginx/conf.d/
