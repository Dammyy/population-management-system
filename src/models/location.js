module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    femalePopulation: {
      type: DataTypes.INTEGER,
    },
    malePopulation: {
      type: DataTypes.INTEGER,
    },
    totalPopulation: {
      type: DataTypes.INTEGER,
    }
  });

  Location.associate = (models) => {
    Location.hasMany(models.Location, {
      as: 'locations',
      foreignKey: 'parentLocationId'
    });

    Location.belongsTo(models.Location, {
      as: 'location',
      foreignKey: 'parentLocationId'
    });
  }

  return Location;
};
