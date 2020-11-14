FROM node:alpine
WORKDIR /home/app
COPY package*.json ./
ARG PORT=8080
RUN apk update
RUN apk upgrade
RUN apk add bash
RUN npm install
COPY . .
RUN npm run build
RUN rm -rf src
RUN chmod +x scripts/wait_for_it.sh
EXPOSE ${PORT}