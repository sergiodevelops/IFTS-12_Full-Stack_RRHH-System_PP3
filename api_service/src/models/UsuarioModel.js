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

    UsuarioModel.associate = (models)=> {
        // associations can be defined here
    };

    return UsuarioModel;
};
