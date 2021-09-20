const express = require("express"); // API Rest
const bodyParser = require("body-parser"); //analiza la solicitud y crea req.body object
const cors = require("cors"); // middleware Express que habilita CORS con varias opciones

const app = express(); // para usar express
const db = require("./app/models");

const formatoFecha=(fecha,formato)=>{
    return formato
        .replace('YYYY', fecha.getFullYear())
        .replace('MM', fecha.getMonth()+1)
        .replace('DD', fecha.getDate());
}
const fechaActual = formatoFecha(new Date(), 'YYYY-MM-DD');
console.log("fecha actual", fechaActual);



// db.sequelize.sync(); //modo prod
db.sequelize.sync({force: true})
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
* */


// https://www.bezkoder.com/react-node-express-mysql/#Nodejs_Express_Back-end

let corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-tipo_usuario - application/json
app.use(bodyParser.json());

// parse requests of content-tipo_usuario - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Pepe API."});
});

require("./app/routes/user.routes")(app);

// set port, listen for requests
// const PORT = process.env.PORT || 8081;
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server API corriendo en puerto virtual: ${PORT}.`);
});