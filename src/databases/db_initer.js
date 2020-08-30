const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { Logger } = require('../utils');

const dbs = {};
fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(file => file.isDirectory() && /[^\.]+\.database$/
    .test(file.name))
  .map(file => file.name.replace('.database', ''))
  .forEach(databaseName => {
    dbs[databaseName] = {
      getModel: (modelName) => dbs[databaseName][modelName],
    };
  });

class DbsIniter {

  static async init() {
    try {
      await Promise.each(
        Object.keys(dbs),
        async dbName => {
          const databaseConfig = (require(`${__dirname}/`
          + `${dbName}.database/config.js`));
          const currentDatabaseConnector = new Sequelize(
            databaseConfig.name,
            databaseConfig.user,
            databaseConfig.password,
            databaseConfig.config,
          );
          await currentDatabaseConnector.authenticate();
          fs.readdirSync(`${__dirname}/${dbName}.database`)
            .filter(file => /[^\.]+\.model\.js$/.test(file))
            .forEach(modelName => {
              const model = currentDatabaseConnector
                .import(path.join(
                  `${__dirname}/${dbName}.database/`,
                  modelName,
                ));
              dbs[dbName][model.name] = model;
            });
          Object.keys(dbs[dbName]).forEach(modelName => {
            if (dbs[dbName][modelName].associate) {
              dbs[dbName][modelName].associate(dbs[dbName]);
            }
          });
          currentDatabaseConnector.sync({ alter: false });
          dbs[dbName].connector = currentDatabaseConnector;
        },
      );
    } catch (err) {
      Logger.error('MYSQL ERROR:', err);
    }
  }

}

module.exports = {
  dbs,
  DbsIniter,
};