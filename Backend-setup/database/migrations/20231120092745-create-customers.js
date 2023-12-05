module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("customers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      public_id: { type: Sequelize.UUID, unique: true, allowNull: false },
      mobile_no: { type: Sequelize.FLOAT, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: true },

      status: {
        type: Sequelize.STRING,
        enum: ["active", "inactive"],
        defaultValue: "active",
        index: true,
      },

      concurrency_stamp: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
      },
      created_by: Sequelize.UUID,
      updated_by: Sequelize.UUID,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("customers"),
};
