#!/bin/bash

TEXT=`docker inspect yagisanme_mysql_1 | grep "Hostname"`
IFS=' '
set -- $TEXT
TEXT=$4
IFS='"'
set -- $TEXT
HOST=$2
echo "host:$HOST"
sed -i -e "86d" ./girls/girls/settings.py
sed -i -e "86i 'HOST': '${HOST}'," ./girls/girls/settings.py

docker exec -t yagisanme_python_1 python manage.py migrate

docker exec -t yagisanme_python_1 sh createsuperuser.sh

docker exec -t yagisanme_python_1 python manage.py loaddata ./yagisan/fixture/initial_data.yaml
