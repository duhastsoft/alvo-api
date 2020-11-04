FROM node:alpine
WORKDIR /home/app
COPY package*.json ./
ARG PORT=8080
RUN apk add --no-cache bash
RUN npm install
COPY . .
RUN npm run build
RUN chmod +x scripts/wait_for_it.sh
EXPOSE ${PORT}
