FROM node:15.14.0-alpine AS base
WORKDIR /app

FROM base AS dependencies  
COPY package*.json ./
RUN npm i -g npm && npm install

FROM dependencies AS build  
WORKDIR /app
COPY src /app/src 
COPY public /app/public
RUN npm run build

FROM node:15.14.0-alpine AS release

ENV PORT 3000
EXPOSE 3000
  
WORKDIR /app
COPY --from=dependencies /app/package*.json ./
RUN npm i -g npm && npm -g install serve && npm install --only=production
COPY --from=build /app/build ./build
CMD ["serve", "-s", "build", "-p", "3000"]