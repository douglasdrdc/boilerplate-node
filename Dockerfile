FROM node:18
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3008
CMD ["npm", "start" ]