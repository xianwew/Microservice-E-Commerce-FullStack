CREATE DATABASE IF NOT EXISTS paymentservice;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'wxwwxw123';
ALTER USER 'root'@'%' IDENTIFIED BY 'wxwwxw123';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;


