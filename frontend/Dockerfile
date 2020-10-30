FROM node:12.19-alpine3.9
WORKDIR /var/www/angular_assignment/frontend

COPY ./package.json ./
RUN npm install
COPY ./ ./

EXPOSE 4200
CMD ["npm","start"]