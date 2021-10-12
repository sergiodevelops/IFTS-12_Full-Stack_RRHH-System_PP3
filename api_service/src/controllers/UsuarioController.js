// *** import modules ***
const db = require("../models");
const UsuarioController = db.usuarios;
const {userTypes} = require("../constants/userTypes");
// const Op = db.Sequelize.Op;

// UsuarioController.sync({force: true});

// Create and Save a new Tutorial
exports.create = (req, res) => {
    const formatoFecha = (fecha, formato) => {
        return formato
            .replace('YYYY', fecha.getFullYear())
            .replace('MM', fecha.getMonth() + 1)
            .replace('DD', fecha.getDate());
    }
    const fechaActual = formatoFecha(new Date(), 'YYYY-MM-DD');

    // Validate request "tipo_usuario"
    if (!req.body.tipo_usuario) {
        res.status(400).send({
            message: "Debe enviar un TIPO para crear el User!"
        });
        return;
    }
    // Validate request "password"
    if (!req.body.password) {
        res.status(400).send({
            message: "Debe enviar un PASSWORD para crear el User!"
        });
        return;
    }
    // Validate request "nombre_usuario"
    if (!req.body.nombre_usuario) {
        res.status(400).send({
            message: "Debe enviar un NOMBRE para crear el User!"
        });
        return;
    }
    // Create a User
    const usuarios = {
        id: req.body.id,
        tipo_usuario: req.body.tipo_usuario,
        password: req.body.password,
        nombre_usuario: req.body.nombre_usuario,
        fecha_alta: fechaActual || null, // lo crea internamente la API
    };
    // Save User in the database
    UsuarioController.create(usuarios)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the USER."
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {};

// List all user with the specified data filtered
exports.list=(_, res) =>{
    return usuario.findAll({})
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {};