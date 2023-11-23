FROM node:18-alpine

WORKDIR /app

COPY package*.json ./ 

COPY package*.json client/
RUN npm run install-client npm install --only=prod

COPY package*.json server/
COPY server/ server/
RUN npm run install-server npm install --only=prod

COPY client/ client/
RUN npm run build -prefix client

COPY server/ server/
USER  node 

CMD [ "npm", "run", "watch","--prefix","server" ]

EXPOSE 8080
