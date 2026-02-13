FROM node:16-bullseye-slim AS build
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn generate

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
