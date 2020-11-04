FROM node:12.4.0-alpine

WORKDIR /usr/app

COPY . .

RUN npm install

EXPOSE 4321

CMD ["npm", "start"]