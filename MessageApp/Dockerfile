FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY . .

# Create required runtime directories
RUN mkdir -p temp message

EXPOSE 3000

CMD ["node", "server.js"]