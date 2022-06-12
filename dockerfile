FROM node:16.3.0-alpine  AS builder
WORKDIR /usr/src/app 
COPY package.json package-lock.json* ./
RUN npm config set unsafe-perm true
RUN npm i 
COPY  . .
RUN npm run compile



FROM node:16.3.0-alpine  
WORKDIR /usr/src/app 
COPY package.json package-lock.json* ./
RUN npm install --production
COPY --from=builder /usr/src/app/dist ./

EXPOSE 8484

CMD [ "node", "index.js" ]


