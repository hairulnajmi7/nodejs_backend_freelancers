CREATE TABLE rates(

    ID INT(11) PRIMARY KEY AUTO_INCREMENT,
    userid INT,
    freelancerid INT,
    FOREIGN KEY (userid) REFERENCES users(id), 
    FOREIGN KEY (freelancerid) REFERENCES freelancers(id) 

)ENGINE=INNODB