const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "Identificador único del usuario"
    },
    tipo_usuario: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "Si el usuario es un postulante =1 , o es un solicitante = 2 , o es Administrativo = 3"
    },
    password: {
      type: DataTypes.STRING(35),
      allowNull: false,
      comment: "Clave necesaria para ingresar al sistema"
    },
    nombre_usuario: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      comment: "Alias con el que ingresa al sistema",
      unique: "nombre_usuario"
    },
    fecha_alta: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Fecha en que se dió de alta el usuario"
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "nombre_usuario",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nombre_usuario" },
        ]
      },
    ]
  });
};
/*
query example

*/