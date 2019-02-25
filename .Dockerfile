# This is the Dockerfile for the Node server app service. Run this file individually for each service
# All the services will be spawned by and tied together by the docker-compose.yaml file

# Use the latest node base image build on top of Alpine linux for space saving
FROM node:alpine

# Maintainer for this Dockerfile
MAINTAINER jaimeloeuf@gmail.com

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./


# Run the commands needed to build the image
RUN apt-get update -yqq
# Install NPM dependencies if any
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Change the PORT number to the port used in your application
# 80 is usually the default port
EXPOSE 80

# Define the command to run your app using CMD which defines your runtime.
# Use "npm start" which will run your nodeJS app using the run command you specified in package.json
CMD [ "npm", "start" ]

# To build the image from this Dockerfile, run,
# docker build -t node-fw-app .
# To create and run the container using above created image,
# docker run -it --rm --name my-node-app node-fw-app