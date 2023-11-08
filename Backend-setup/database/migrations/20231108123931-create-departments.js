'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable({
      schema: "backend",
      tableName: "departments"
    },
    {
      id: {
        allownull: false,
        autoincrement: true,
        primarykey: true,
        type: Sequelize.STRING
      },
      departmentName: {
        allownull: true,
        type: Sequelize.STRING
      }
    }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable({
      schema: "backend",
      tableName: "departments"
    })
  }
};
