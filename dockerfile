# Use the base image of Node.js 18
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock and install dependencies
COPY package.json ./
RUN yarn install

# Copy the application code
COPY . .

# Set environment variables
ENV HOST 0.0.0.0
ENV PORT 5000

# Expose the port
EXPOSE 5000

# Start the application
CMD ["yarn", "start"]
