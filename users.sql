CREATE TABLE users(

    userID INT(11) PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(255),
    username VARCHAR (255),
    password VARCHAR(255),
    phone INT(11),
    email VARCHAR (255),
    age INT (11),
    role VARCHAR(255)

)ENGINE=INNODB