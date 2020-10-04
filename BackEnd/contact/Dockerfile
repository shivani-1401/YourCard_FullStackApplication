From java:8-jre
WORKDIR usr/src
ENV MONGO_DATABASE=hackcontactdb
ENV MONGO_PORT=27017
ENV MONGO_HOST=localhost
ENV MONGO_URL=mongodb://localhost:27017/hackcontactdb
ADD ./target/contact-0.0.1-SNAPSHOT.jar /usr/src/contact-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","contact-0.0.1-SNAPSHOT.jar"]
