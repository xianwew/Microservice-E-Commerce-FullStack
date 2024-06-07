CREATE DATABASE IF NOT EXISTS itemservice;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'wxwwxw123';
ALTER USER 'root'@'%' IDENTIFIED BY 'wxwwxw123';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;

CREATE USER 'replica'@'%' IDENTIFIED WITH mysql_native_password BY 'replica_password';
GRANT REPLICATION SLAVE ON *.* TO 'replica'@'%';
FLUSH PRIVILEGES;

CHANGE REPLICATION SOURCE TO
    SOURCE_HOST='itemservice-master',  -- Adjust to your source host
    SOURCE_USER='replica',
    SOURCE_PASSWORD='replica_password',
    SOURCE_LOG_FILE='mysql-bin.000001',  -- Adjust based on SHOW MASTER STATUS output
    SOURCE_LOG_POS=0;  -- Adjust based on SHOW MASTER STATUS output

START REPLICA;





