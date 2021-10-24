// *** import modules ***
// const db = require("../models");
// const UsuarioModel = db.usuarios;
const Sequelize = require('sequelize');
const UsuarioModel = require('../models').usuarios;
// UsuarioModel.sync({force: true});

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

    const newDbUser = {
        id: req.body.id, // lo autoincrementa la API

        userType: req.body.userType,
        userFullname: req.body.userFullname,
        username: req.body.username,
        password: req.body.password,

        startDate: fechaActual || "" // lo genera la API
    };

    // Save User in the database if "username" not exist
    UsuarioModel
        .create(newDbUser, { username: req.body.username })
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(409).send({
                name: "DuplicateUsernameEntry",
                message: `El usuario "${req.body.username}" ya existe, intente con uno diferente.`
            });
        });
};

// Update a User by the id in the request
/*exports.update = (req, res) => {};*/

// List all user with the specified data filtered
/*exports.list=(_, res) =>{
    return UsuarioModel.findAll({})
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
};*/
// Delete a User with the specified id in the request
/*
exports.delete = (req, res) => {};*/
