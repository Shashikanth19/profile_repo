'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn({
      schema: "backend",
      tableName: "branches"
    },
    "shashi_column",
    {
      type: Sequelize.STRING,
      allownull: true
    }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn({
      schema: "backend",
      tableName: "branches"
    },
    "shashi_column",
    {
      type: Sequelize.STRING,
      allownull: true
    }
    )
  }
};
