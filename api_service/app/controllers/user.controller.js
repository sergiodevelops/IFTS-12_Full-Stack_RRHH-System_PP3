/*
este modelo representa la tabla de usuarios
 el crud no es necesario, dado que Sequelize ya tiene
 los metodos para hacer todos los tipos de operaciones con los datos
*/

/*
- crear un nuevo USER: create(object)
- encontrar un USER por "id": findByPk(id)
- obtener todos los USERS: findAll()
- actualizar un USER por "id": update(data, where: { id: id })
- eliminar un USER por "id": destroy(where: { id: id })
- eliminar todos los USERS: destroy(where: {})
- encontrar todos los USERS por "nombre" (texto coincidente): findAll({ where: { title: ... } })
*/

//metodos que usara nuestro controlador



const db = require("../models");
const User = db.usuarios;
// const Op = db.Sequelize.Op;


// User.sync({force: true});

// Create and Save a new Tutorial
exports.create = (req, res) => {
    const formatoFecha=(fecha,formato)=>{
        return formato
            .replace('YYYY', fecha.getFullYear())
            .replace('MM', fecha.getMonth()+1)
            .replace('DD', fecha.getDate());
    }
    const today = new Date();
    const formato = "YYYY-MM-DD";
    const fechaActual = formatoFecha(today, formato);

    console.log("req.body.tipo_usuario", req.body.tipo_usuario);
    console.log("req.body.nombre_usuario", req.body.nombre_usuario);
    console.log("req.body.password", req.body.password);
    console.log("req.body.fecha_alta", fechaActual);

    // Validate request
    if (!req.body.tipo_usuario) {
        res.status(400).send({
            message: "Debe enviar un TIPO para crear el User!"
        });
        return;
    }
    if (!req.body.nombre_usuario) {
        res.status(400).send({
            message: "Debe enviar un NOMBRE para crear el User!"
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({
            message: "Debe enviar un PASSWORD para crear el User!"
        });
        return;
    }

    // Create a User
    const users = {
        tipo_usuario: req.body.tipo_usuario,
        nombre_usuario: req.body.nombre_usuario,
        password: req.body.password,
        fecha_alta: fechaActual, // lo crea internamente la API
    };

    // Save Tutorial in the database
    User.create(users)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the USER."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

};

// Find a single User with an id
exports.findOne = (req, res) => {

};

// Update a User by the id in the request
exports.update = (req, res) => {

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Users
exports.findAllPublished = (req, res) => {

};
