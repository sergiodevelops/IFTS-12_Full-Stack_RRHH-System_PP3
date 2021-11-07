var DataTypes = require("sequelize").DataTypes;
var _postulantes = require("./postulantes");

function initModels(sequelize) {
  var postulantes = _postulantes(sequelize, DataTypes);


  return {
    postulantes,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
