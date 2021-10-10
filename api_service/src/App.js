// *** import modules ***
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser"); //analiza la solicitud y crea req.body object
const cors = require("cors"); // middleware Express que habilita CORS con varias opciones
const app = express(); // para usar express
const db = require("./models/index");
const UsuarioRouter = require("./routes/UsuarioRouter");


app.use(logger('dev'));
const formatoFecha = (fecha, formato) => {
    return formato
        .replace('YYYY', fecha.getFullYear())
        .replace('MM', fecha.getMonth() + 1)
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
// puerto "de donde provienen" las peticiones (web_service)
let corsOptions = {
    origin: "http://localhost:3005"
};
app.use(cors(corsOptions));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
// parse requests of content-tipo_usuario - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// simple route response
// app.get("/", (req, res) => {
//     res.json({message: "Pepe API."});
// });
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to API RRHH Group!',
}));

UsuarioRouter(app);

// puerto "a donde se reciben" las peticiones (api_service)
const PORT = process.env.APP_PORT || 4005;
console.log((process.env.APP_PORT ? "process.env.APP_PORT --> " : "PORT hardcode is --> "), PORT);

app.listen(PORT, () => {
    console.log(`Server API corriendo en puerto virtual: ${PORT}.`);
});
