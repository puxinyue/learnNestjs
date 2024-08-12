FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package*.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

#production
FROM node:18.0-alpine3.14 as production-stage

WORKDIR /app

COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/dist /app

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install --production

RUN npm install pm2 -g 

EXPOSE 3000

CMD ["pm2-runtime", "/app/main.js"]
