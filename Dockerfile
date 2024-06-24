# Use the official Node.js image from the Docker Hub
FROM node:18-alpine3.16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Nest.js dependencies
RUN npm install --only=production

# Install Prisma CLI
RUN npm install -g prisma

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port that your Nest.js app runs on
EXPOSE 3000

# Command to run your Nest.js application using npm
CMD ["npm", "run", "start:prod"]