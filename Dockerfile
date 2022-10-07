FROM node:16 as builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install

COPY . .

RUN yarn build

FROM node:lts-alpine as base

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist/ dist/

ENV PORT 80
EXPOSE 80

CMD [ "node", "dist/index.js" ]