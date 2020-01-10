var Sequelize = require('sequelize');
var sequelize = new Sequelize('test', 'root', 'root',
    {
        host: 'localhost',
        dialect: 'mysql'
    });

var Libro = sequelize.define('libro', {
    titulo: Sequelize.STRING,
    autor: Sequelize.STRING
});


module.exports = Libro;
