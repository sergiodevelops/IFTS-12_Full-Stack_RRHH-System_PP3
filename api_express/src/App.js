require('dotenv').config();
const {API_PORT, WEB_PORT, DB_PORT} = process.env;
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser"); //analiza la solicitud y crea req.body object
const cors = require("cors"); // middleware Express que habilita CORS con varias opciones
const app = express(); // para usar express
const db = require("./models/index");
const router = require("./routes/");

//logger
app.use(logger('dev'));
//MODO desarrollo
db.sequelize.sync({force: true}) //MODO desarrollo, fuerza la sincronización con la DB
// MODO produccion
// db.sequelize.sync() //MODO produccion
    .then((data) => { //modo dev
        console.log("Drop and re-sync db.");
    })
    .catch((error) => {
        console.log('el error es:', error)
    });
// puerto "de donde provienen" las peticiones (ui_react)
const webPort = WEB_PORT || 3005;
let corsOptions = {
    origin: `http://localhost:${webPort}`
};
app.use(cors(corsOptions));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
// parse requests of content-userType - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//import index routes
require('./routes')(app);

//all routes
router(app);

// puerto "a donde se reciben" las peticiones del frontend ui_react (api_express)
const apiPort = API_PORT || 4005;
const dbPort = DB_PORT || 3306;
app.listen(apiPort, () => {
    console.log("API PORT --> ", (apiPort ? ".env API_PORT --> " : "API_PORT hardcodeado --> "), apiPort);
    console.log("DATABASE  --> ", (dbPort ? ".env DB_PORT --> " : "DB_PORT hardcodeado --> "), dbPort);
});
