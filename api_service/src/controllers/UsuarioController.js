// *** import modules ***
const db = require("../models");
const UsuarioController = db.usuarios;
const {userTypes} = require("../constants/userTypes");
// const Op = db.Sequelize.Op;

// UsuarioController.sync({force: true});

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate "userType"
    if (!req.body.userType) {
        res.status(400).send({
            message: "Debe enviar un 'userType' para crear el User!"
        });
        return;
    }
    // Validate "userFullname"
    if (!req.body.userFullname) {
        res.status(400).send({
            message: "Debe enviar un 'userFullname' para crear el User!"
        });
        return;
    }
    // Validate "username"
    if (!req.body.username) {
        res.status(400).send({
            message: "Debe enviar un 'username' para crear el User!"
        });
        return;
    }
    // Validate "password"
    if (!req.body.password) {
        res.status(400).send({
            message: "Debe enviar un 'password' para crear el User!"
        });
        return;
    }
    // Generate "startDate"
    const formatoFecha = (fecha, formato) => {
        return formato
            .replace('YYYY', fecha.getFullYear())
            .replace('MM', fecha.getMonth() + 1)
            .replace('DD', fecha.getDate());
    }

    // Create a User
    const fechaActual = formatoFecha(new Date(), 'YYYY-MM-DD');
    const usuarios = {
        id: req.body.id, // lo autoincrementa la API

        userType: req.body.userType,
        userFullname: req.body.userFullname,
        username: req.body.username,
        password: req.body.password,

        startDate: fechaActual || null, // lo genera la API
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