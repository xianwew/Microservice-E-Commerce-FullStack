#!/bin/bash
set -e

# Run the SQL commands
mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'appuser'@'%' IDENTIFIED BY 'wxwwxw123'; FLUSH PRIVILEGES;"



