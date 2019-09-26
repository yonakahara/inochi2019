FROM alpine:edge

MAINTAINER SUGIYAMA Kazuki

EXPOSE 3306

VOLUME /root/sql

WORKDIR /root/

ADD startup.sh /root/startup.sh

RUN chmod +x /root/startup.sh && \
    apk add --update mysql=10.1.24-r0 && \
    mkdir -p /var/lib/mysql && \
    mkdir -p /etc/mysql/conf.d && \
    { \
        echo '[mysqld]'; \
        echo 'user = root'; \
        echo 'datadir = /var/lib/mysql'; \
        echo 'port = 3306'; \
        echo 'log-bin = /var/lib/mysql/mysql-bin'; \
        echo 'socket = /var/lib/mysql/mysql.sock'; \
        echo '!includedir /etc/mysql/conf.d/'; \
        echo 'character-set-server=utf8'; \
    } > /etc/mysql/my.cnf && \
    rm -rf /var/cache/apk/*

CMD ["/root/startup.sh"]
