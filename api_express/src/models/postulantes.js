/*
 * Copyright (c) 2021.
 * All Rights Reserved
 * This product is protected by copyright and distributed under
 * licenses restricting copying, distribution, and decompilation.
 * @SergioArielJuárez (https://github.com/sergioarieljuarez)
 * @JoseLuisGlavic
 *
 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('postulantes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    dni: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "Nro de documento"
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Apellidos"
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Nombres"
    },
    tel: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "teléfonos"
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "direcciones de correos electrónicos"
    }
  }, {
    sequelize,
    tableName: 'postulantes',
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
        name: "idx_dni",
        using: "BTREE",
        fields: [
          { name: "dni" },
        ]
      },
      {
        name: "idx_apellido",
        using: "BTREE",
        fields: [
          { name: "apellido" },
          { name: "nombres" },
        ]
      },
    ]
  });
};
