From java:8-jre
WORKDIR usr/src
ADD ./target/gateway-0.0.1-SNAPSHOT.jar /usr/src/gateway-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","gateway-0.0.1-SNAPSHOT.jar"]
EXPOSE 8761