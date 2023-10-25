# Stage 1: Build the application
FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Create the production image
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/sites-enabled/vesuvian
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
