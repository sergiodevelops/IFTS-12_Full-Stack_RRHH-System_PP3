/*
 * Copyright (c) 2021.
 * All Rights Reserved
 * This product is protected by copyright and distributed under
 * licenses restricting copying, distribution, and decompilation.
 * @SergioArielJuárez (https://github.com/sergioarieljuarez)
 * @JoseLuisGlavic
 *
 */

const {usuarios: UsuarioModel} = require("../models/allModels");
const PostulanteModel = require('../models/allModels').postulantes;

const getPagination = (size, page) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return {limit, offset};
};

const getPagingData = (data, page, limit) => {
    const {count: totalItems, rows: applicants} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {totalItems, applicants, totalPages, currentPage};
};

exports.create = (req, res) => {
    // Validate "dni"
    if (!req.body.dni) {
        res.status(400).send({
            message: "Debe enviar un 'dni' para crear el User!"
        });
        return;
    }
    // Validate "apellido"
    if (!req.body.nombre_completo) {
        res.status(400).send({
            message: "Debe enviar un 'apellido' para crear el User!"
        });
        return;
    }
    // Validate "nombres"
    if (!req.body.nombres) {
        res.status(400).send({
            message: "Debe enviar un 'nombres' para crear el User!"
        });
        return;
    }
    // Validate "tel"
    if (!req.body.tel) {
        res.status(400).send({
            message: "Debe enviar un 'tel' para crear el User!"
        });
        return;
    }
    // Validate "email"
    if (!req.body.email) {
        res.status(400).send({
            message: "Debe enviar un 'email' para crear el User!"
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
    const newDbUser = {
        tipo_usuario: req.body.tipo_usuario,
        nombre_completo: req.body.nombre_completo,
        username: req.body.username,
        password: req.body.password,
    };

    // Save User in the database if "username" not exist
    PostulanteModel
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

exports.findAllByFilters = (req, res) => {
    let {size, page, tipo_usuario} = req.query;
    const userTypeIsValid = (tipo_usuario > 0 && tipo_usuario < 4);
    const condition = tipo_usuario ? {tipo_usuario: userTypeIsValid ? tipo_usuario : null} : null;
    const {limit, offset} = getPagination(size, page);

    PostulanteModel
        .findAndCountAll(/*{
                where: condition,
                limit,
                offset
            }*/)
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving applicants."
            });
        });

    // other CRUD functions
};
