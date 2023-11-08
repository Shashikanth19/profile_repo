'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn({
      schema: "backend",
      tableName: "branches"
    },
    "shashi_column"
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn({
      schema: "backend",
      tableName: "branches"
    },
    "shashi_column"
    )
  }
};
