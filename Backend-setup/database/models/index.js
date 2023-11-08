/**
 * Initializing the sequelize-cli init command
 * (http://docs.sequelizejs.com/manual/tutorial/migrations.html#bootstrapping)
 * */
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const db = {};

const { Sequelize, DataTypes } = require('sequelize');

const models = (sequelize) => {
  const db = {};
  const loadModels = (directory) => {
    fs.readdirSync(directory)
      .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
      .forEach((file) => {
        const model = require(path.join(directory, file))(sequelize, DataTypes);
        db[model.name] = model;
      });

    fs.readdirSync(directory)
      .filter((subdirectory) => fs.statSync(path.join(directory, subdirectory)).isDirectory())
      .forEach((subdirectory) => {
        loadModels(path.join(directory, subdirectory));
      });
  };

  loadModels(__dirname);

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  return db;
};



module.exports = models;

