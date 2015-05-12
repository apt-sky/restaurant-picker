FROM node:0.10
MAINTAINER "Aakash Thakkar" aakashthakkar@gmail.com

ADD . /src

EXPOSE 3000
CMD node /src/server.js