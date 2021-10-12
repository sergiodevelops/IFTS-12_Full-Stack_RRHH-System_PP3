// *** import modules ***
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser"); //analiza la solicitud y crea req.body object
const cors = require("cors"); // middleware Express que habilita CORS con varias opciones
const app = express(); // para usar express
const db = require("./models/index");
const UsuarioRouter = require("./routes/UsuarioRouter");
require('dotenv').config();
const {API_PORT, WEB_PORT} = process.env;
app.use(logger('dev'));
// db.sequelize.sync() //En PRODUCCIÓN
db.sequelize.sync({force: true}) //En desarrollo, es posible que deba eliminar las tablas existentes y volver a sincronizar la base de datos
    .then(() => { //modo dev
        console.log("Drop and re-sync db.");
    })
    .catch((error) => {
        console.log('el error es:', error)
    });
// puerto "de donde provienen" las peticiones (web_service)
const webPort = WEB_PORT || 3005;
let corsOptions = {
    origin: `http://localhost:${webPort}`
};
app.use(cors(corsOptions));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
// parse requests of content-userType - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// simple route response
app.get("/check", (req, res) => {
    res.json({message: "API its OK"});
});
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to API RRHH Group!',
}));

UsuarioRouter(app);

// puerto "a donde se reciben" las peticiones del frontend web_service (api_service)
const apiPort = API_PORT || 4005;
app.listen(apiPort, () => {
    console.log("Corriendo en ", (apiPort ? "API_PORT --> " : "API_PORT hardcodeado --> "), apiPort);
});
