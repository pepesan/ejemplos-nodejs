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
        objeto = new Libro(3,req.body.titulo, req.body.autor);
        // TODO meter en la BBDD el objeto
        // devolver el objeto en JSON
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(objeto));
    },
    show : function (req, res) {
        // Recojo el id por url
        var iden=req.params.id;
        // TODO obtener de la BBDD el objeto por su ID
        var object= new Libro(
            iden,
            'Guardias!!! Guardias???',
            "Terry Pratchett");
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(object));

    },
    edit : function (req, res) {
        // Recojo el id por url
        var iden=req.params.id;
        // TODO: validar el body
        console.log(req.body);
        // TODO obtener de la BBDD el objeto por su ID
        var object = new Libro(
            iden,
            req.body.titulo,
            req.body.autor
        );
        // TODO Hacer la modificación en la BBDD
        // devuelves los datos modificados
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(object));
    },
    delete : function (req, res) {
        // Recojo el id por url
        var iden=req.params.id;
        // TODO borrar de la BBDD el objeto por su ID
        var object = new Libro(
            iden,
            'Guardias!!! Guardias???',
            "Terry Pratchett"
        );
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(object));

    },
    vista: function(req, res, next) {
        res.render('vista', { title: 'vista' });
    }
};

module.exports = app;
