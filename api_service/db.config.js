// En la aplicación de carpeta, creamos una separada de configuración de la carpeta para la configuración con db.config.js archivo de la siguiente manera:

module.exports = {
    HOST: "localhost",
    PORT: "3306",
    USER: "root",
    PASSWORD: "root",
    DB: "rrhh",
    dialect: "mysql",
    pool: {
        max: 5, //número máximo de conexiones simultaneas
        min: 0, //número mínimo de conexiones simultaneas
        acquire: 30000, //tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada
        idle: 10000, //tiempo máximo, en milisegundos, que el grupo intentará conectarse antes de lanzar el error
    }
};

