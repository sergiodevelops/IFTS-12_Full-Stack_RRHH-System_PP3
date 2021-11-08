var DataTypes = require("sequelize").DataTypes;
var _anuncios = require("./anuncios");

function initModels(sequelize) {
  var anuncios = _anuncios(sequelize, DataTypes);


  return {
    anuncios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
