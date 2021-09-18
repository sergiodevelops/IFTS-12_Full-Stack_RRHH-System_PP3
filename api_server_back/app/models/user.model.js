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
// https://sequelize.org/master/manual/model-basics.html
// https://www.bezkoder.com/react-node-express-mysql/#Nodejs_Express_Back-end
// https://sequelize.org/master/manual/model-basics.html

'use strict';
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        tipo_usuario: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        nombre_usuario: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.CHAR
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'usuarios',
        classMethods: {}
    });

    User.associate = (models)=> {
        // associations can be defined here

    };
    return User;
};