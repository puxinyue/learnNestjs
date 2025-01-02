FROM node:18.0-alpine3.14 as build-stage

# 声明构建参数  
ARG http_proxy  
ARG https_proxy  

# 设置代理  
ENV http_proxy=$http_proxy  
ENV https_proxy=$https_proxy 

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]