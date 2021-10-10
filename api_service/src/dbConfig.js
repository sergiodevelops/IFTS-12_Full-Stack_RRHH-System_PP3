// En la aplicación de carpeta, creamos una separada de configuración de la carpeta para la configuración con db.config.js archivo de la siguiente manera:
require('dotenv').config();

const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_DIALECT,
} = process.env;

const dbConfig = {
    HOST: DB_HOST || "localhost",
    PORT: DB_PORT || "3306",
    USER: DB_USERNAME || "adm",
    PASSWORD: DB_PASSWORD || "adm",
    DB: DB_NAME || "rrhh",
    dialect: DB_DIALECT || "mysql",
    pool: {
        max: 5, //número máximo de conexiones simultaneas
        min: 0, //número mínimo de conexiones simultaneas
        acquire: 30000, //tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada
        idle: 10000, //tiempo máximo, en milisegundos, que el grupo intentará conectarse antes de lanzar el error
    },
};
console.log("dbConfig",dbConfig)

module.exports = dbConfig;

