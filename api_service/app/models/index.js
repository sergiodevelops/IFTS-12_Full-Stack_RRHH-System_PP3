const dbConfig = require("../../db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });

const DB = {}; //TODO cambiar por "const" una vez que funcione dar un alta

DB.Sequelize = Sequelize;
DB.sequelize = sequelize;
DB.usuarios = require("./user.model.js")(sequelize, Sequelize);

module.exports = DB;
