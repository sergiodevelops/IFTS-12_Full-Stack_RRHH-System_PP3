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
//https://tomasmalio.medium.com/node-js-express-y-mysql-con-sequelize-ec0a7c0ae292

'use strict';
const formatoFecha = (fecha, formato) => {
    return formato
        .replace('YYYY', fecha.getFullYear())
        .replace('MM', fecha.getMonth() + 1)
        .replace('DD', fecha.getDate());
}
const today = new Date();
const formato = "YYYY-MM-DD";
const fechaActual = formatoFecha(today, formato);

module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('usuario', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(11),
        },
        tipo_usuario: {
            allowNull: false,
            type: DataTypes.TINYINT(3),
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(35),
        },
        nombre_usuario: {
            allowNull: true,
            type: DataTypes.CHAR(20),
        },
        fecha_alta: {
            allowNull: true,
            defaultValue: fechaActual,
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'usuarios',
        classMethods: {},
    });

    UserModel.associate = (models)=> {
        // associations can be defined here
    };

    return UserModel;
};
