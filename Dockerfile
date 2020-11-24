FROM node:10-stretch-slim

WORKDIR /usr/app

COPY . .

RUN npm install

EXPOSE 4321

CMD ["npm", "start"]