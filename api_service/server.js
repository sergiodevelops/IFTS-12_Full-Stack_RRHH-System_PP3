const express = require("express"); // API Rest
const logger        = require('morgan');

const bodyParser = require("body-parser"); //analiza la solicitud y crea req.body object
const cors = require("cors"); // middleware Express que habilita CORS con varias opciones

// https://tomasmalio.medium.com/node-js-express-y-mysql-con-sequelize-ec0a7c0ae292
// Set up the express app
const app = express(); // para usar express
// Log requests to the console.
app.use(logger('dev'));

const db = require("./app/models");

const formatoFecha=(fecha,formato)=>{
    return formato
        .replace('YYYY', fecha.getFullYear())
        .replace('MM', fecha.getMonth()+1)
        .replace('DD', fecha.getDate());
}
const fechaActual = formatoFecha(new Date(), 'YYYY-MM-DD');
console.log("fecha actual", fechaActual);

// db.sequelize.sync() //En PRODUCCIÓN
db.sequelize.sync({force: true}) //En desarrollo, es posible que deba eliminar las tablas existentes y volver a sincronizar la base de datos
    .then(() => { //modo dev
        console.log("Drop and re-sync db.");
    })
    .catch((error) => {
        console.log('el error es:', error)
    });
/*
    Express es para construir las API Rest
    body-parser ayuda a analizar la solicitud y crear el req.bodyobjeto
    cors proporciona middleware Express para habilitar CORS con varias opciones.
*/
// https://www.bezkoder.com/react-node-express-mysql/#Nodejs_Express_Back-end

// puerto "de donde provienen" las peticiones (web_service)
let corsOptions = {
    origin: "http://localhost:3005"
};
app.use(cors(corsOptions));
// parse requests of content-tipo_usuario - application/json
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
// parse requests of content-tipo_usuario - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// simple route
// app.get("/", (req, res) => {
//     res.json({message: "Pepe API."});
// });
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome Casco to Pepe API !!!',
}));
require("./routes/user.routes")(app);
// puerto "a donde se reciben" las peticiones (api_service)
const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
    console.log(`Server API corriendo en puerto virtual: ${PORT}.`);
});
