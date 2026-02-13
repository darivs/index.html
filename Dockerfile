FROM node:18-slim AS build
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:18-slim
WORKDIR /app
COPY --from=build /app/.nuxt ./.nuxt
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/nuxt.config.js ./
COPY --from=build /app/package.json ./
COPY --from=build /app/static ./static
EXPOSE 3000
CMD ["yarn", "start"]
