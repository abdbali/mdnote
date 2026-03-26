FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html
COPY . .

# Serve on 8080 for local parity with common dev setups
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
