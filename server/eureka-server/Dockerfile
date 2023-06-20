FROM eclipse-temurin:17-jre-alpine
EXPOSE 8761
ARG JAR_FILE=target/eureka-server-1.0.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]