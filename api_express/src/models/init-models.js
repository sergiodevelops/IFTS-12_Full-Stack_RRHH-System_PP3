var DataTypes = require("sequelize").DataTypes;
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var usuarios = _usuarios(sequelize, DataTypes);


  return {
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
