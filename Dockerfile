FROM node:18-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R root:root /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER root

RUN npm install

COPY --chown=root:root . .

EXPOSE 3000

CMD [ "npm", "start" ]