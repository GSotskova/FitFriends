FROM node:18.13-alpine
WORKDIR /opt/fitfriends-training
COPY ./dist/apps/training/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/training .
CMD ["node", "./main.js"]
