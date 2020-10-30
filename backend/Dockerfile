FROM node:alpine
WORKDIR /var/www/angular_assignment/backend

COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm","start"]