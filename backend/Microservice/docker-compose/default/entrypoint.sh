#!/bin/bash
# entrypoint.sh

# Set the correct permissions on the my.cnf file
chmod 644 /etc/mysql/conf.d/my.cnf

# Execute the original entrypoint
exec docker-entrypoint.sh "$@"
