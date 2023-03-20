FROM node
RUN useradd fiona
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
EXPOSE 5173
USER fiona
CMD ["yarn", "dev"]