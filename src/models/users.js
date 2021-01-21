module.exports = (sequelize, DataTypes) => {

  //define the attributes to a database
  const Users = sequelize.define('Users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      age: DataTypes.INTEGER,
      role: DataTypes.STRING

  });

  Users.associate = function(models) {
   
    Users.belongsToMany(models.freelancers, {
      through: 'Hires'    
    });    
   
    Users.belongsToMany(models.freelancers, {
      through: 'Rates'
    });                                     //This is used for relational databases
  }

  return Users;
  
}

