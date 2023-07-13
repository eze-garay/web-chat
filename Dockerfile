
FROM node


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 8080


ENV MONGO_URL=mongodb://172.17.0.3:27017/coder-containers-docker-kubernetes?retryWrites=true&w=majority


CMD [ "npm" , "start" ]