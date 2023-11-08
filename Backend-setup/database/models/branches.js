module.exports = (sequelize, DataTypes) => {
    const branches = sequelize.define(
      'branches',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        
        public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
        branch_name: { type: DataTypes.STRING, allowNull: false },
        branch_code: { type: DataTypes.STRING, unique: true, allowNull: false },
        branch_description: { type: DataTypes.STRING, allowNull: false },
       
        status: {
          type: DataTypes.STRING,
          enum: [ 'active', 'inactive' ],
          defaultValue: 'inactive',
          index: true,
        },
        concurrency_stamp: { type: DataTypes.UUID, unique: true, allowNull: false },
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
        schema: "backend"
      },
    );
  
    // branches.associate = (models) => {
    //   branches.hasMany(models.employees, {
    //     foreignKey: 'branch_id',
    //     sourceKey: 'public_id',
    //   });
      
     
    // };
  
    return branches;
  };
  