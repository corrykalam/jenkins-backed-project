FROM node:12.19-alpine

WORKDIR /usr/app

COPY . .

RUN npm install

EXPOSE 4321

CMD ["npm", "start"]