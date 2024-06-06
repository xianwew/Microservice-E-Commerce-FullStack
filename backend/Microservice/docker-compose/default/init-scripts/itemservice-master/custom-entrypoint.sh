#!/bin/bash
set -e

# Wait for MySQL to be ready
until mysqladmin ping -h "localhost" --silent; do
  echo 'Waiting for MySQL to be ready...'
  sleep 2
done

# Run the SQL commands
mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'appuser'@'%' IDENTIFIED BY 'wxwwxw123'; FLUSH PRIVILEGES;"

update mysql.user set authentication_string="wxwwxw123" where user="root";