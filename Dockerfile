FROM node
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
EXPOSE 5173
USER node
CMD ["yarn", "dev"]