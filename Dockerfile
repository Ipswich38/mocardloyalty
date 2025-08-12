# Multi-stage Docker build for MOCards

# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production --silent

# Copy source code
COPY . .

# Build the application
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost || exit 1

# Expose port
EXPOSE 80

# Add metadata
LABEL maintainer="MO Dental Care <support@mocards.com>"
LABEL description="MOCards - Digital Dental Loyalty Card System"
LABEL version="1.0.0"

# Start nginx
CMD ["nginx", "-g", "daemon off;"]