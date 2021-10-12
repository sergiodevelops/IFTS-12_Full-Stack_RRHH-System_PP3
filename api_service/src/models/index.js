// << Initialize Sequelize >>

//importa Sequelize
const {Sequelize} = require("sequelize");
//importa config para conexión a la base con sequelize
const dbConfig = require("../dbConfig");
//importa los modelos para virtualizar la DB con sequelize
const UsuarioModel = require("./UsuarioModel");

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

const db = {}; //TODO cambiar por "const" una vez que funcione dar un alta

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.usuarios = UsuarioModel(sequelize, Sequelize);

module.exports = db;
