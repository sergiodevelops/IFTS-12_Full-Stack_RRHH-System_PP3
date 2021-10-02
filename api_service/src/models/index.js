// import modules
const dbConfig = require("../DbConfig");
const {Sequelize} = require("sequelize");
const UserModel = require("./UserModel");


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
DB.usuarios = UserModel(sequelize, Sequelize);

module.exports = DB;
