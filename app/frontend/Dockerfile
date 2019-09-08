FROM node:12
RUN mkdir /src
ADD /app/frontend/datamod /src/app
WORKDIR  /src/app
RUN yarn install
EXPOSE 3000