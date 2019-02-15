# Using node v10 LTS base image
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Change the PORT number to the port used in your application
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime.
# Use "npm start" which will run your nodeJS app using the run command you specified in package.json
CMD [ "npm", "start" ]