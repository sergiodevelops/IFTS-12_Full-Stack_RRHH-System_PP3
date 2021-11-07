const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('solicitantes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    empresa: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Nombre de la empresa solicitante"
    },
    contacto: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "Persona de contacto (nombre y apellido)"
    },
    telefonos: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "teléfonos"
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Correos electrónicos"
    },
    codigo_postal: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true,
      comment: "Código postal del domicilio de la empresa",
      references: {
        model: 'codigos_postales',
        key: 'id'
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "0 con solicitudes abiertas, 1 sin solicitudes "
    },
    observaciones: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    domicilio: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    id_usuario: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "id de la tabla de usuarios",
      references: {
        model: 'usuarios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'solicitantes',
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
          { name: "empresa" },
        ]
      },
      {
        name: "idx_apellido",
        using: "BTREE",
        fields: [
          { name: "contacto" },
          { name: "observaciones" },
        ]
      },
      {
        name: "fk_sttes_cospos_idx",
        using: "BTREE",
        fields: [
          { name: "codigo_postal" },
        ]
      },
      {
        name: "fk_usuario_idx",
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
};
