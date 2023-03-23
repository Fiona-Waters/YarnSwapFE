FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies 
RUN yarn 
# Build the app
RUN yarn build

# Bundle static assets with nginx
FROM nginxinc/nginx-unprivileged as production
# FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 5173
# Start nginx
CMD ["nginx", "-g", "daemon off;"]



# FROM node
# RUN useradd fiona
# WORKDIR /app
# COPY package.json .
# COPY yarn.lock .
# RUN yarn
# COPY . .
# EXPOSE 5173
# USER fiona
# CMD ["yarn", "dev"]