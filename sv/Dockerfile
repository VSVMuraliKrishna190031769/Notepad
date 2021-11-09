FROM node:10.19.0
# Create app directory inside docker file
WORKDIR /usr/src/app
COPY package*.json ./
# Bundle app source code
COPY . .
RUN npm install
CMD [ "npm", "start" ]