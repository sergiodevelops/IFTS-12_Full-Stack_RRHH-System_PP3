/*
este modelo representa la tabla de usuarios
 el crud no es necesario, dado que Sequelize ya tiene
 los metodos para hacer todos los tipos de operaciones con los datos
*/

/*
crear un nuevo tutorial: create(object)
encontrar un tutorial por id: findByPk(id)
obtener todos los tutoriales: findAll()
actualizar un tutorial por id: update(data, where: { id: id })
eliminar un tutorial: destroy(where: { id: id })
eliminar todos los tutoriales: destroy(where: {})
encontrar todos los tutoriales por título: findAll({ where: { title: ... } })
*/

//metodos que usara nuestro controlador



const db = require("../models");
const User = db.usuarios;
const Op = db.Sequelize.Op;


User.sync({force: true});

// Create and Save a new Tutorial
exports.create = (req, res) => {

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
