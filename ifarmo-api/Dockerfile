FROM node:18
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY package*.json ./
RUN pnpm install
COPY . .
EXPOSE 8000
CMD [ "node", "app.js" ]
