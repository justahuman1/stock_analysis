FROM node:12
RUN mkdir /src
ADD /datamod /src/datamod
WORKDIR  /src/datamod
RUN yarn install
EXPOSE 3000