// *** import modules ***
// const db = require("../models");
// const UsuarioModel = db.usuarios;
const Sequelize = require('sequelize');
const UsuarioModel = require('../models').usuarios;
const db = require("../models");
const Op = db.Sequelize.Op;

// UsuarioModel.sync({force: true});

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return {limit, offset};
};

const getPagingData = (data, page, limit) => {
    const {count: totalItems, rows: tutorials} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {totalItems, tutorials, totalPages, currentPage};
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate "tipo_usuario"
    if (!req.body.tipo_usuario) {
        res.status(400).send({
            message: "Debe enviar un 'tipo_usuario' para crear el User!"
        });
        return;
    }
    // Validate "nombre_completo"
    if (!req.body.nombre_completo) {
        res.status(400).send({
            message: "Debe enviar un 'nombre_completo' para crear el User!"
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
        // id: req.body.id, // lo autoincrementa la API

        tipo_usuario: req.body.tipo_usuario,
        nombre_completo: req.body.nombre_completo,
        username: req.body.username,
        password: req.body.password,

        // startDate: fechaActual || "" // lo genera la API
    };

    // Save User in the database if "username" not exist
    UsuarioModel
        .create(newDbUser, {username: req.body.username})
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

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const {page, size, title} = req.query;
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    const {limit, offset} = getPagination(page, size);

    UsuarioModel
        .findAndCountAll({where: condition, limit, offset})
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// find all published? Users
exports.findAllByUserType = (req, res) => {
    const {page, size} = req.query;
    const {limit, offset} = getPagination(page, size);

    UsuarioModel
        .findAndCountAll({where: {tipo_usuario: true}, limit, offset})
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

    // other CRUD functions
};
