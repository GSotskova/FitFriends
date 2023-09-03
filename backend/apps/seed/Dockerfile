FROM node:18.13-alpine
WORKDIR /opt/fitfriends-seed
COPY ./dist/apps/seed/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/seed .
CMD ["node", "./main.js"]
