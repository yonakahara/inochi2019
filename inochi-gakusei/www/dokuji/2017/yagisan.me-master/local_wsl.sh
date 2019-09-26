#!/bin/bash

COMMAND="eval \$(docker-machine.exe env --shell=bash) && docker inspect yagisanme_mysql_1"
TEXT=`/mnt/c/Program\ Files/Git/bin/bash.exe -c "${COMMAND} | grep Hostname"`
IFS=' '
set -- $TEXT
TEXT=$4
IFS='"'
set -- $TEXT
HOST=$2
echo "host:$HOST"
sed -i -e "86d" ./girls/girls/settings.py
sed -i -e "86i 'HOST': '${HOST}'," ./girls/girls/settings.py

COMMAND="eval \$(docker-machine.exe env --shell=bash) && docker exec -t yagisanme_python_1 python manage.py migrate"
/mnt/c/Program\ Files/Git/bin/bash.exe -c "${COMMAND}"

COMMAND="eval \$(docker-machine.exe env --shell=bash) && docker exec -t yagisanme_python_1 sh createsuperuser.sh"
/mnt/c/Program\ Files/Git/bin/bash.exe -c "${COMMAND}"

COMMAND="eval \$(docker-machine.exe env --shell=bash) && docker exec -t yagisanme_python_1 python manage.py loaddata ./yagisan/fixture/initial_data.yaml"
/mnt/c/Program\ Files/Git/bin/bash.exe -c "${COMMAND}"
