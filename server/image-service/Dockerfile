# Use a base image with Java
FROM eclipse-temurin:17-jre-alpine

# Expose the port the app runs in
EXPOSE 8095

# Add the following build arguments
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG JAR_FILE=target/image-service-1.0.jar

# Set the environment variables
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

# Add the jar file to the container
ADD ${JAR_FILE} app.jar

# Command to run the application
ENTRYPOINT ["java","-jar","/app.jar"]