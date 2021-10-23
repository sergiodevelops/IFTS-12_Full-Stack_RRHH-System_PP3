// Tabla "usuarios"
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
    const UsuarioModel = sequelize.define('usuario', {
        userType: {
            allowNull: false,
            type: DataTypes.TINYINT(3),
        },
        userFullname: {
            allowNull: false,
            type: DataTypes.STRING(50),
        },
        username: {
            allowNull: false,
            unique: true,
            type: DataTypes.CHAR(20),
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(35),
        },
        startDate: {
            allowNull: false,
            // defaultValue: fechaActual,
            type: DataTypes.STRING(10),
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'usuarios',
        classMethods: {},
    });

    UsuarioModel.associate = (models)=> {
        // associations can be defined here
    };

    return UsuarioModel;
};
