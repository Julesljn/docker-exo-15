FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

RUN echo "PORT=3000\nHOST=0.0.0.0\nMINECRAFT_RCON_HOST=localhost\nMINECRAFT_RCON_PORT=25575\nMINECRAFT_RCON_PASSWORD=your_password" > .env

RUN npm run build

EXPOSE 3000

CMD ["node", "build/index.js"]