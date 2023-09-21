FROM nginx:alpine

COPY .docker/conf/default.conf /etc/nginx/conf.d/
COPY .docker/conf/mime.types /etc/nginx/
RUN mkdir -p /usr/share/nginx/html/ui
RUN mkdir -p /usr/share/nginx/html/module
COPY dist /usr/share/nginx/html/ui
COPY dist/module /usr/share/nginx/html/module

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]