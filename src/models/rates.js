const freelancers = require("./freelancers");
const users = require("./users");

module.exports = (sequelize, DataTypes) => {

  //define the attributes to a database
  const Rates = sequelize.define('Rates', {
    
  rating: DataTypes.DOUBLE,

  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },

  freelancerid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
    references: {
      model: 'freelancers',
      key: 'id'
    }
  },

  });

  
  return Rates;
 
}
 