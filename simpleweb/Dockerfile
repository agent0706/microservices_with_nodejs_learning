# base image
FROM node:alpine

# changing work directory in the container
WORKDIR /home/node/test

# copying contents of build directory to the image
COPY ./ ./

# installing the project
RUN npm install

# start command
CMD ["npm", "start"]