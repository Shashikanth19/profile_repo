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
      desg_name: {
        type: DataTypes.STRING,
        allownull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      // timestamps: true,
      schema: "backend",
    }
  );

  return designations;
};
