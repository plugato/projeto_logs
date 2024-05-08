FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --verbose

COPY . .

CMD ["npx", "nodemon", "--exec", "npx", "ts-node", "./src/app.ts"]
