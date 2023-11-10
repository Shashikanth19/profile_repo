module.exports = (sequelize, DataTypes) => {
  const designations = sequelize.define(
    "designations",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },

      public_id: { type: DataTypes.UUID, allowNull: false, unique: true },

      desg_name: {
        type: DataTypes.STRING,
        allownull: false,
      },
      status: {
        type: DataTypes.STRING,
        enum: [ 'active', 'inactive' ],
        defaultValue: 'inactive',
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
      schema: "backend",
    }
  );

  return designations;
};
