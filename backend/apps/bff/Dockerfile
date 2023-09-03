FROM node:18.13-alpine
WORKDIR /opt/fitfriends-bff
COPY ./dist/apps/bff/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/bff .
CMD ["node", "./main.js"]
