var Libro = require("../models/libro");
var app = {
    index: function(req, res) {
        // TODO esto tendría que venir de la BBDD
        res.setHeader('Content-Type', 'application/json');
        Libro.find(function (err, users) {
            if (err) return console.error(err);
            //console.log(users);
            res.send(JSON.stringify(users));
        });
    },
    add: function(req, res) {
        // TODO: validar el body
        console.log(req.body);
        var libro = new Libro({
            titulo: req.body.titulo,
            autor: req.body.autor
        });
        libro.save(function (err, librodevuelto) {
            if (err) {
                return console.error(err);
            } else {
                console.log("libro guardado");
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(librodevuelto));
            }
        });
    },
    show : function (req, res) {
        // Recojo el id por url
        var iden=req.params.id;
        var objeto = {
            _id: iden
        };
        Libro.findOne(
            objeto,
            function (err, libro) {
                if (err) return console.error(err);
                //console.log(users);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(libro));
            }
        );

    },
    edit : function (req, res) {
        var objetoModificado = {};
        objetoModificado._id = req.params.id;
        objetoModificado.titulo = req.body.titulo;
        objetoModificado.autor = req.body.autor;
        console.log(objetoModificado);
        Libro.findByIdAndUpdate(
            req.params.id,
            objetoModificado,
            function (err, libro) {
                if (err) return console.error(err);
                console.log(libro);
                Libro.findById(
                    req.params.id,
                    function (err, libro) {
                        if (err) return console.error(err);
                        console.log(libro);
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(libro));
                    }
                );
            }
        );
    },
    delete : function (req, res) {
        Libro.findByIdAndRemove(
            req.params.id,
            function (err, libro) {
                if (err) return console.error(err);
                //console.log(users);
                //FALTA BORRAR
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(libro));
            }
        );

    },
    vista: function(req, res, next) {
        res.render('vista', { title: 'vista' });
    },
    search: function(req, res) {
        console.log(req.query);
        res.setHeader('Content-Type', 'application/json');
        var query =Libro.find({});
        if(req.query.page && parseInt(req.query.page) >=1){
            query.skip(req.query.page*req.query.num);
        }
        if(req.query.num && parseInt(req.query.num) >=1){
            query.limit(parseInt(req.query.num));
        }else{
            query.limit(10);
        }
        query.exec(function (err, users) {
            if (err) return console.error(err);
            //console.log(users);
            res.send(JSON.stringify(users));
        });
    },
};

module.exports = app;
