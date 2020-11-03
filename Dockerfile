FROM node
WORKDIR /home/app
COPY package*.json ./
ARG PORT=8080
RUN npm install
COPY . .
RUN npm run build
EXPOSE ${PORT}
