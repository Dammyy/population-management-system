'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LocationDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      malePopulation: {
        type: Sequelize.STRING
      },
      femalePopulation: {
        type: Sequelize.INTEGER
      },
      totalPopulation: {
        type: Sequelize.INTEGER
      },
      parentLocation: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Locations',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('LocationDetails');
  }
};
