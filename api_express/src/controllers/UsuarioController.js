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
                name: "Duplicate Username Entry",
                message: `El usuario "${req.body.username}" ya existe, intente con uno diferente.`
            });
        });
};


// login User (hace un "findOne")
exports.login = (req, res) => {
    // Validate "username"
    if (!req.body.username) {
        res.status(400).send({
            name: "UsernameEmptyEntry",
            message: "Debe enviar un 'username' para poder iniciar sesión!"
        });
        return;
    }
    // Validate "password"
    if (!req.body.password) {
        res.status(400).send({
            name: "PasswordEmptyEntry",
            message: "Debe ingresar una 'password' para poder iniciar sesión!"
        });
        return;
    }

    // Find User in the database by "username" and "password"
    UsuarioModel
        .findOne({where: {username: req.body.username}})
        .then((user) => {
                if (user && user.password === req.body.password) {
                    res.status(200).send(user);
                }
                res.status(404).send({
                    name: "Credentials Wrong",
                    message: `Las credenciales ingresadas para autenticarse no son validas, intente nuevamente`
                });
            }
        )
        .catch((err) => {
            res.status(500).send({
                name: `${err.name}`,
                message: `${err.message}`
            });
        });
};
