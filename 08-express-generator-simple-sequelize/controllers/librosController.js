var Sequelize = require("sequelize");
var sequelize = new Sequelize('test', 'root', 'root',
    {
        host: 'localhost',
        dialect: 'mysql'
    });
var Libro = require("../models/libro");
var app = {
    listado: [],
    index: function(req, res) {
        // TODO esto tendría que venir de la BBDD
        sequelize.sync().then(
            function () {
                Libro.findAll().then(function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                });
            }
        );

    },
    add: function(req, res) {
        // TODO: validar el body
        console.log(req.body);
        Libro.create({
          titulo: req.body.titulo,
          autor: req.body.autor
        }).then(function (data) {
            console.log("Create:"+JSON.stringify(data));
            res.setHeader('Content-Type', 'application/json');
            res.send( JSON.stringify(data));
            res.end();
        });
    },
    show : function (req, res) {
        // Recojo el id por url
        var iden=req.params.id;
        // TODO obtener de la BBDD el objeto por su ID
        Libro.findAll({
          where: {
            id: iden
          }
        }).then(function (data){
          console.log("FindAllById:"+JSON.stringify(data));
          res.setHeader('Content-Type', 'application/json');
          res.send( JSON.stringify(data[0]));
          res.end();
        });

    },
    edit : function (req, res) {
        // Recojo el id por url
        var iden=req.params.id;
        Libro.update({ // datos a modificar
          titulo: req.body.titulo,
          autor: req.body.autor
        },
        { // condición a aplicar
          where: {
            id: iden
          }
        }).then(function (data){
          Libro.findAll({
            where: {
              id: iden
            }
          }).then(function (data){
            console.log("FindAllById:"+JSON.stringify(data));
            res.setHeader('Content-Type', 'application/json');
            res.send( JSON.stringify(data[0]));
            res.end();
          });
        });
    },
    delete : function (req, res) {
        // Recojo el id por url
        var iden=req.params.id;
        Libro.findAll({
          where: {
            id: iden
          }
        }).then(function (data){
          Libro.destroy({
            where: {
              id: iden
            }
          }).then(function (data2){
            console.log("FindAllById:"+JSON.stringify(data));
            res.setHeader('Content-Type', 'application/json');
            res.send( JSON.stringify(data));
            res.end();
          });
        });

    },
    vista: function(req, res, next) {
        res.render('vista', { title: 'vista' });
    }
};

module.exports = app;
