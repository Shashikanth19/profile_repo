'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable(
      {
        schema: "backend",
        tableName: "designations",
      },
      {
        id: {
          type: sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        desg_name: {
          type: sequelize.STRING,
          allownull: false,
        },
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable({
      schema: "backend",
      tableName: "designations",
    });
  },
};
