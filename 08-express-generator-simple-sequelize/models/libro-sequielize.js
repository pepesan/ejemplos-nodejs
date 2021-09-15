'use strict';
module.exports = (sequelize, DataTypes) => {
  const Libro = sequelize.define('Libro', {
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING
  }, {});
  Libro.associate = function(models) {
    // associations can be defined here
  };
  return Libro;
};