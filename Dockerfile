FROM node
RUN useradd fiona
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
EXPOSE 5173
USER fiona
CMD ["yarn", "dev"]