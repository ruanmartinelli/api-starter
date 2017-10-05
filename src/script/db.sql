-- Instructions:
--
-- 1. Install MySQL
-- 2. Setup a localhost database
-- 3. Update the DB_* parameters in the .env
--      to match you configuration
-- 4. Run the script above
--
-- @TODO: http://knexjs.org/#Migrations
--
-- Important:
--
--    Change "db_name" to be the same of DB_DATABASE param in the .env file
--
CREATE DATABASE db_name;

CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` DATE DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
