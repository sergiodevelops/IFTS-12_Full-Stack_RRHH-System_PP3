// *** import modules ***
// const db = require("../models");
// const AnuncioModel = db.anuncios;
const Sequelize = require('sequelize');
const AnuncioModel = require('../models').anuncios;
const db = require("../models");
const {where} = require("sequelize");
const Op = db.Sequelize.Op;

// AnuncioModel.sync({force: true});

const getPagination = (size, page) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return {limit, offset};
};

const getPagingData = (data, page, limit) => {
    const {count: totalItems, rows: users} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {totalItems, users, totalPages, currentPage};
};

// ALTA (crea nuevo anuncio)
exports.create = (req, res) => {
    // Validate "tipo_anuncio"
    if (!req.body.tipo_anuncio) {
        res.status(400).send({
            message: "Debe enviar un 'tipo_anuncio' para crear el User!"
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

        tipo_anuncio: req.body.tipo_anuncio,
        nombre_completo: req.body.nombre_completo,
        username: req.body.username,
        password: req.body.password,

        // startDate: fechaActual || "" // lo genera la API
    };

    // Save User in the database if "username" not exist
    AnuncioModel
        .create(newDbUser, {username: req.body.username})
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(409).send({
                name: "Duplicate Username Entry",
                message: `El anuncio "${req.body.username}" ya existe, intente con uno diferente.`
            });
        });
};

// LOGIN (recupera si existe el anuncio que coincida por username y pass)
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
    AnuncioModel
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

// CONSULTA (obtiene los anuncios segun filtros)
exports.findAllByUserType = (req, res) => {
    let {size, page, tipo_anuncio} = req.query;
    const userTypeIsValid = (tipo_anuncio > 0 && tipo_anuncio < 4);
    const condition = tipo_anuncio ? {tipo_anuncio: userTypeIsValid ? tipo_anuncio : null} : null;
    const {limit, offset} = getPagination(size, page);

    AnuncioModel
        .findAndCountAll({where: condition, limit, offset})
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });

    // other CRUD functions
};

// MODIFICACIÓN DE USUARIO COMPLETO (reemplazo)
exports.update = (req, res) => {
    const id = req.params.id;

    AnuncioModel
        .update(req.body, {where: {id: id}})
        .then(data => {
            if (data == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id + err.message
            });
        });
};

// MODIFICACIÓN DE USUARIO PARCIAL (actualización)
exports.replace = (req, res) => {
    const {id} = req.query;

    AnuncioModel
        .update(
            req.body,
            {where: {id: id}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// BAJA (elimina el anuncio)
exports.delete = (req, res) => {
    const {id} = req.query;

    AnuncioModel.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!" + id
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};
