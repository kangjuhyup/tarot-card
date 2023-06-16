# Build client
FROM node:18 as client-builder
WORKDIR /tarot-card/client
COPY ./client/package.json ./client/yarn.lock ./
RUN yarn install --network-timeout 1000000000
COPY ./client .
RUN yarn build

# Build server
FROM node:18 as server-builder
WORKDIR /tarot-card/server
COPY ./server/package.json ./server/yarn.lock ./
RUN yarn install
COPY ./server .

# Final image
FROM node:18-alpine
WORKDIR /tarot-card
COPY --from=client-builder /tarot-card/client/build ./client/build
COPY --from=server-builder /tarot-card/server ./
CMD ["yarn", "start"]
