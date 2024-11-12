FROM node:22

WORKDIR /app

COPY . .

RUN npm install -g yarn
RUN yarn install

RUN npx prisma generate

CMD npx prisma migrate deploy && yarn build && node .output/server/index.mjs
