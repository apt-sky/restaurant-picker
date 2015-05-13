FROM node:latest

ADD . /src

ENV NODE_ENV=aws

EXPOSE 3000

CMD node /src/server.js
