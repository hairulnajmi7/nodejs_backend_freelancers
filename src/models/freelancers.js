module.exports = (sequelize, DataTypes) => {

    //define the attributes to a database
    const Freelancers = sequelize.define('Freelancers', {
       
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true 
        }, 
        name: DataTypes.STRING,
        profession : DataTypes.STRING,
        hourlyRate: DataTypes.STRING,
        experience: DataTypes.STRING,
        completedProject: DataTypes.STRING,
        country: DataTypes.STRING,
        image: DataTypes.STRING,
        description: DataTypes.STRING,
        rating: DataTypes.STRING
    });
  
    Freelancers.associate = function(models) {
        
      Freelancers.belongsToMany(models.users, {
          through: 'Hires' , foreignKey:'id' 
        }
      );  

        


        Freelancers.belongsToMany(models.users, {
            through: 'Rates' , foreignKey:'id'                                     
      }
    ); 

  }
    return Freelancers;
  }