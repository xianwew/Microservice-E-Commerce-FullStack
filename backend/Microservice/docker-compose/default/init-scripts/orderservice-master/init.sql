CREATE DATABASE IF NOT EXISTS orderservice;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'wxwwxw123';
ALTER USER 'root'@'%' IDENTIFIED BY 'wxwwxw123';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;

-- Create replication user
CREATE USER 'replica'@'%' IDENTIFIED BY 'replica_password';
GRANT REPLICATION SLAVE ON *.* TO 'replica'@'%';
FLUSH PRIVILEGES;

-- Enable binary logging
SET GLOBAL server_id = 1;
SET GLOBAL log_bin = 'mysql-bin';

