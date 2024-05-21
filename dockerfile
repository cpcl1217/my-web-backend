# Stage 1: Build the Docusaurus site
FROM node:lts as builder

# Set environment variables for logging and colors
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and other necessary files
COPY package.json ./

# If you are using npm, uncomment the following line:
COPY package-lock.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Debug step: list installed packages
RUN yarn list

# Build the Docusaurus site
RUN yarn build

# Stage 2: Serve the built site using Nginx
FROM nginx:stable-alpine

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/configfile.template

# Set environment variables for Nginx
ENV PORT 5000
ENV HOST 0.0.0.0

# Update the default Nginx configuration with environment variables
RUN sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"

# Copy the built site from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port Nginx will serve on
EXPOSE 5000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
