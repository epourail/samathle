CREATE DATABASE IF NOT EXISTS directus CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE USER IF NOT EXISTS 'directus'@'%' IDENTIFIED BY 'directus';
GRANT ALL PRIVILEGES ON `directus`.* TO 'directus'@'%';

CREATE DATABASE IF NOT EXISTS keycloak CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE USER IF NOT EXISTS 'keycloak'@'%' IDENTIFIED BY 'keycloak';
GRANT ALL PRIVILEGES ON `keycloak`.* TO 'keycloak'@'%';

FLUSH PRIVILEGES;
