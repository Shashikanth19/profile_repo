module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define(
    "customers",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
      mobile_no: { type: DataTypes.FLOAT, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: true },

      status: {
        type: DataTypes.STRING,
        enump: ["active", "inactive"],
        defaultValue: "active",
        index: true,
      },

      concurrency_stamp: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
      },
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
    }
  );

  customers.associate = (models) => {};

  return customers;
};
