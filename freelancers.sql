CREATE TABLE freelancers(

    ID INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    hourlyRate VARCHAR (255),
    experience VARCHAR(255),
    completedProject VARCHAR(255),
    country VARCHAR (255),
    image VARCHAR (255)
)ENGINE=INNODB