# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the contents of the local src directory to the working directory
COPY ./src ./src

# Expose port 8000 to the outside world
EXPOSE 8000

# Command to run your application
CMD ["npm", "start"]
