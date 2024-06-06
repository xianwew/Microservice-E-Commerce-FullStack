CREATE DATABASE IF NOT EXISTS orderservice;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'wxwwxw123';
ALTER USER 'root'@'%' IDENTIFIED BY 'wxwwxw123';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;

CHANGE MASTER TO
  MASTER_HOST='orderservice-master',
  MASTER_USER='replica',
  MASTER_PASSWORD='replica_password',
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=0;

START SLAVE;




