FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install -g nodemon

RUN npm install

EXPOSE 3455

CMD ["npm", "start"]