FROM eclipse-temurin:17-jre-alpine
EXPOSE 8090
ARG JAR_FILE=target/customer-1.0.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
