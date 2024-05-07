FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "nodemon", "--exec", "npx", "ts-node", "app.ts"]
