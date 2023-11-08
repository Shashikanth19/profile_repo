module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable({
    schema: 'backend',
    tableName: 'branches'
  }, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    public_id: { type: Sequelize.UUID, unique: true },
    //user_id: { type: Sequelize.UUID, allowNull: true},
    branch_name: { type: Sequelize.STRING, allowNull: false, unique: true },
    branch_code: { type: Sequelize.STRING, allowNull: false, unique: true },
    branch_description: { type: Sequelize.STRING, allowNull: false },
    status: {
      type: Sequelize.STRING,
      enum: ['active', 'inactive'],
      defaultValue: 'inactive',
      index: true,
    },
    concurrency_stamp: { type: Sequelize.UUID, unique: true, allowNull: false },
    created_by: { type: Sequelize.UUID },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_by: { type: Sequelize.UUID },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable({
    schema: 'backend',
    tableName: 'branches'
  }),
};
