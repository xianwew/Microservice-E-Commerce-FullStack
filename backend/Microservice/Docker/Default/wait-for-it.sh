
host="$1"
shift
cmd="$@"

until mysql -h "$host" -u root -p"$MYSQL_ROOT_PASSWORD" -e "select 1" > /dev/null 2>&1; do
  echo "Waiting for $host to be ready..."
  sleep 5
done

echo "Host is ready. Copying tables..."

# Dump the master database schema and data
mysqldump -h "$host" -u root -p"$MYSQL_ROOT_PASSWORD" --databases itemservice > /tmp/itemservice.sql

# Import the dump into the slave
mysql -u root -p"$MYSQL_ROOT_PASSWORD" < /tmp/itemservice.sql

echo "Tables copied successfully."

exec $cmd
