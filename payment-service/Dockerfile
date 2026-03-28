# Stage 1: Build (Debian-based image to match prisma engine requirements)
FROM node:20-bullseye-slim AS build
WORKDIR /app
COPY package.json ./
# copy prisma schema early so postinstall (prisma generate) can run during npm install
COPY prisma ./prisma
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates openssl && rm -rf /var/lib/apt/lists/* \
	&& npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-bullseye-slim
WORKDIR /app
COPY --from=build /app .
CMD ["node", "dist/main.js"]
