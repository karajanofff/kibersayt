FROM node:20-alpine AS build
WORKDIR /app

COPY package.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/

RUN npm install && npm install --prefix client && npm install --prefix server

COPY client ./client
COPY server ./server

RUN npm run build --prefix client && node server/scripts/copy-client-dist.js

FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY server/package.json ./server/
RUN npm install --prefix server --omit=dev

COPY server ./server
COPY --from=build /app/server/client-dist ./server/client-dist

WORKDIR /app/server
EXPOSE 5000

CMD ["node", "src/index.js"]
