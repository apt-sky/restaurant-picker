FROM node:latest

ADD . /src

EXPOSE 3000

CMD node /src/server.js
