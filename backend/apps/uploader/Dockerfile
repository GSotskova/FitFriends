FROM node:18.13-alpine
WORKDIR /opt/fitfriends-uploader
COPY ./dist/apps/uploader/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/uploader .
CMD ["node", "./main.js"]
