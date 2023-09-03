FROM node:18.13-alpine
WORKDIR /opt/fitfriends-users
COPY ./dist/apps/users/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/users .
CMD ["node", "./main.js"]
