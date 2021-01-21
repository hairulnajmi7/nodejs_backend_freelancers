CREATE TABLE hires(

    ID INT(11) PRIMARY KEY AUTO_INCREMENT,
    userid INT,
    freelancerid INT,
    FOREIGN KEY (userid) REFERENCES users(id), 
    FOREIGN KEY (freelancerid) REFERENCES freelancers(id),
    FOREIGN KEY (freelancername) REFERENCES freelancers(name),
    FOREIGN KEY (freelancerprofession) REFERENCES freelancers(profession),
    FOREIGN KEY (freelancerhourlyRate) REFERENCES freelancers(hourlyRate),
    FOREIGN KEY (freelancerexperience) REFERENCES freelancers(experience),
    FOREIGN KEY (freelancercompletedProject) REFERENCES freelancers(completedProject), 
    FOREIGN KEY (freelancercountry) REFERENCES freelancers(country),
    FOREIGN KEY (freelancerimage) REFERENCES freelancers(image)
    
)ENGINE=INNODB