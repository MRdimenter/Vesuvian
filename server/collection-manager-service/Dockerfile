# Use a base image with Java
FROM eclipse-temurin:17-jre-alpine

# Expose the port the app runs in
EXPOSE 8099

# Add the following build arguments
ARG COLLECTION_MANAGER_POSTGRES_PASSWORD
ARG JAR_FILE=target/collection-manager-service-1.0.jar

# Add the jar file to the container
ADD ${JAR_FILE} app.jar

# Add the changelog directory
COPY /src/main/resources/db/changelog /db/changelog

# Add environment variables
ENV COLLECTION_MANAGER_POSTGRES_PASSWORD=$COLLECTION_MANAGER_POSTGRES_PASSWORD

# Command to run the application
ENTRYPOINT ["java","-jar","/app.jar"]