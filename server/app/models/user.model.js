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

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        type: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    });

    return User;
};