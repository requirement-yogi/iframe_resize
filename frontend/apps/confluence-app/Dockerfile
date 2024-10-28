FROM nginx:1.26.2-alpine
WORKDIR /usr/share/nginx/html/web
RUN rm -rf /usr/share/nginx/html/*
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/snippets/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY dist .
EXPOSE 80
CMD ["/bin/sh", "-c", "envsubst < static/js/env.template.js > static/js/env.js && exec nginx -g 'daemon off;'"]
