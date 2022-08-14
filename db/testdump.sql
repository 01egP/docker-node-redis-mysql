CREATE TABLE User(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	user_name VARCHAR(60),
	user_age INT
);

INSERT INTO User(user_name, user_age) VALUES("First User", 21);
INSERT INTO User(user_name, user_age) VALUES("Second User", 23);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
