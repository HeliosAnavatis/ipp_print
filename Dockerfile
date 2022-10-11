FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME /tmp

EXPOSE 8081
CMD [ "node", "main.js" ]
