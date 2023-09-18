FROM nginx:alpine

COPY .docker/conf/default.conf /etc/nginx/conf.d/
COPY .docker/conf/mime.types /etc/nginx/
COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]