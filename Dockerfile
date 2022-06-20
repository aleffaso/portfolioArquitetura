FROM node:latest

WORKDIR /app

ADD package.json /app

RUN npm install

ADD . /app

EXPOSE 3000

CMD ["npm", "run", "start"]

ADD wait-for-it.sh /usr/wait-for-it.sh

RUN chmod +x /usr/wait-for-it.sh
