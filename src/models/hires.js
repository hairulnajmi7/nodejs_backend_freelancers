const freelancers = require("./freelancers");
const users = require("./users");

module.exports = (sequelize, DataTypes) => {

  //define the attributes to a database
  const Hires = sequelize.define('Hires', {
    
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

  // freelancername: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   foreignKey: true,
  //   references: {
  //     model: 'freelancers',
  //     key: 'name'
  //   }
  // },

  // freelancerprofession: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   foreignKey: true,
  //   references: {
  //     model: 'freelancers',
  //     key: 'profession'
  //   }
  // },

  // freelancerhourlyRate: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   foreignKey: true,
  //   references: {
  //     model: 'freelancers',
  //     key: 'hourlyRate'
  //   }
  // },

  // freelancerexperience: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   foreignKey: true,
  //   references: {
  //     model: 'freelancers',
  //     key: 'experience'
  //   }
  // },

  // freelancercompletedProject: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   foreignKey: true,
  //   references: {
  //     model: 'freelancers',
  //     key: 'completedProject'
  //   }
  // },

  // freelancercountry: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   foreignKey: true,
  //   references: {
  //     model: 'freelancers',
  //     key: 'country'
  //   }
  // },

  // freelancerimage: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   foreignKey: true,
  //   references: {
  //     model: 'freelancers',
  //     key: 'image'
  //   }
  // },

  });

  return Hires;

}
 