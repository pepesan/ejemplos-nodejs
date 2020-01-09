var formidable = require('formidable');

var app = {
    listado: [],
    index: function(req, res) {
        // TODO esto tendría que venir de la BBDD
        var listado = [
            {
                'id': 1,
                'titulo': "El color de la Magia",
                'autor': "Terry Pratchett"
            },
            {
                'id': 2,
                'titulo': "Mort",
                'autor': "Terry Pratchett"
            }
        ];
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(listado));
    },
    add: function(req, res) {
        // TODO: validar el body
        console.log(req.body);
        // TODO meter en la BBDD el objeto
        req.body.id=3;
        // devolver el objeto en JSON
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(req.body));
    },
    show : function (req, res) {
        // Recojo el id por url
        var iden=req.params.id;
        // TODO obtener de la BBDD el objeto por su ID
        var object = {
            id: iden,
            titulo: 'Guardias!!! Guardias???',
            autor: "Terry Pratchett"
        };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(object));

    },
    edit : function (req, res) {
        // Recojo el id por url
        var iden=req.params.id;
        // TODO: validar el body
        console.log(req.body);
        // TODO obtener de la BBDD el objeto por su ID
        // TODO Hacer la modificación en la BBDD
        req.body.titulo = "Rechicero";
        // devuelves los datos modificados
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(req.body));
    },
    delete : function (req, res) {
        // Recojo el id por url
        var iden=req.params.id;
        // TODO borrar de la BBDD el objeto por su ID
        var object = {
            id: iden,
            titulo: 'Guardias!!! Guardias???',
            autor: "Terry Pratchett"
        };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(object));

    },
};

module.exports = app;
