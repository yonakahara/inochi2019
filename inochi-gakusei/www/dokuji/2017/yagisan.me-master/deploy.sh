#!/bin/bash

WORKDIR=$(cd $(dirname $0) && pwd)
cd $WORKDIR

export DB_NAME="yagisan"
export DB_USER="yagisan"
export DB_PASS="yagisan"
export DB_HOST="localhost"
export DB_PORT="3306"

/usr/local/bin/python3.6 $WORKDIR/girls/manage.py migrate
/usr/local/bin/python3.6 $WORKDIR/girls/manage.py loaddata $WORKDIR/girls/yagisan/fixture/initial_data.yaml
cd $WORKDIR/girls/yagisan/static/yagisan
/usr/local/bin/compass w & /usr/local/bin/python3.6 $WORKDIR/girls/manage.py runserver 0.0.0.0:80 &
