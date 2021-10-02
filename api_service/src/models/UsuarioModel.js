// *** import modules ***
'use strict';
const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class usuario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    usuario.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        tipo_usuario: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        nombre_usuario: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.STRING,
        },
        status: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.CHAR,
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'usuario',
        classMethods: {},
    });

    Usuario.associate = function(models) {
        // associations can be defined here
    };

    return usuario;
};