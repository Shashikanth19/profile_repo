"use strict";

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

        public_id: { type: sequelize.UUID, allowNull: false, unique: true },

        desg_name: {
          type: sequelize.STRING,
          allownull: false,
        },
        status: {
          type: sequelize.STRING,
          enum: [ 'active', 'inactive' ],
          defaultValue: 'inactive',
          index: true,
        },

        concurrency_stamp: {
          type: sequelize.UUID,
          unique: true,
          allowNull: false,
        },
        created_by: sequelize.UUID,
        updated_by: sequelize.UUID,
        created_at: {
          allowNull: false,
          type: sequelize.DATE,
          defaultValue: sequelize.NOW,
        },
        updated_at: {
          allowNull: false,
          type: sequelize.DATE,
          defaultValue: sequelize.NOW,
        },
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable({
      schema: "backend",
      tableName: "designations",
    });
  },
};
