From java:8-jre
WORKDIR usr/src
ENV MONGO_DATABASE=hackpaymentdb
ENV MONGO_PORT=27017
ENV MONGO_HOST=localhost
ENV MONGO_URL=mongodb://localhost:27017/hackpaymentdb
ADD ./target/payment-0.0.1-SNAPSHOT.jar /usr/src/payment-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","payment-0.0.1-SNAPSHOT.jar"]