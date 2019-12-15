FROM node:13.2.0-alpine
WORKDIR /amrtzn
COPY package.json yarn.lock ./
RUN npx yarn@1.19.2 install
COPY . .
RUN npm run build
EXPOSE 5000
ENV NODE_ENV=production
CMD npx --no-install serve -s
