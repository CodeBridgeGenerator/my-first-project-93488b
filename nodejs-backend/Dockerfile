# Pull the Node image from Docker Hub
FROM node:16-slim

# Setting Working Directory
WORKDIR /usr/app

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy rest of the code to container
COPY . .

EXPOSE 3030

# Run the API on Nodemon
CMD ["npm", "run", "dev"]