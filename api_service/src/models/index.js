// << Initialize Sequelize >>

//importa config para conexión a la base
const dbConfig = require("../dbConfig");
const {Sequelize} = require("sequelize");
//importa el modelo para exportarlo en DB
const UserModel = require("./UsuarioModel");


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
db.usuarios = UserModel(sequelize, Sequelize);

module.exports = db;
