const Model = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


//login authentication for user
const authentication = {
      
      login: async(req, res) => {
        let users = [];
        try{ 
            users= await Model.Users.findAll({
            where: {
              email: req.body.email,
            }
          })
          if (users.length==0) {
            return res.status(404).send({ message: "User Not found." });
          }

else    {

var count=0;
for(var i=0;i<users.length;i++){
    var passwordIsValid = bcrypt.compareSync(  
        req.body.password,
        users[i].password
      );
     
     if(passwordIsValid==true){
      count++;        //to check if password is valid
      var token = jwt.sign({ id: users[i].id }, "secretKey"); 
        return res.status(200).json({
            id: users[i].id,
            role: users[i].role,
            username: users[i].username,
            email: req.body.email,
            accessToken: token
          });
     }
     
}
        if(count==0){
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
     }
}
      }
          catch(error) {
            res.status(500).send({ message: error.message });
          }
}
     
 
}

module.exports = authentication

    //   if (passwordIsValid) {
    //     var token = jwt.sign({ id: user.id }, "secretKey"); 

    //     res.status(200).send({
    //         id: user.id,
    //         username: "fdfdf",
    //         email: "dsdsd",
    //         accessToken: "sasa"
    //       });
    //   }

  
 