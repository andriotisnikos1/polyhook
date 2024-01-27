from node:current-alpine

workdir /app

copy package.json /app

run npm install

copy . /app

run npm run build

cmd npm start