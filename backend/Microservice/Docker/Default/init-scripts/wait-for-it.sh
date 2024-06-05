#!/usr/bin/env bash

host="$1"
shift
cmd="$@"

until mysql -h "$host" -u root -p"$MYSQL_ROOT_PASSWORD" -e "select 1" > /dev/null 2>&1; do
  echo "Waiting for $host to be ready..."
  sleep 1
done

exec $cmd

