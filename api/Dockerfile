FROM node:12-slim

# Create app directory
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node

# Install dependencies
COPY --chown=node:node package.json package-lock*.json ./
RUN npm install && npm cache clean --force

# Bundle app source
COPY --chown=node:node . .

# Exports
EXPOSE 5000
CMD ["npm", "start"]