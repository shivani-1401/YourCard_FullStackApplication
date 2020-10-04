From java:8-jre
WORKDIR usr/src
ENV MONGO_DATABASE=hackuserdb
ENV MONGO_PORT=27017
ENV MONGO_HOST=localhost
ENV MONGO_URL=mongodb://localhost:27017/hackuserdb
ADD ./target/userauthentication-0.0.1-SNAPSHOT.jar /usr/src/userauthentication-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","userauthentication-0.0.1-SNAPSHOT.jar"]
