var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100/test');
var db = mongoose.connection;
var conectado = false;
var User = require("../models/user");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conexion abierta");
    conectado = true;

});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('api', {
        title: 'API Rest Mongo'
    });
});
router.get('/getAll', function (req, res, next) {
    if (conectado) {
        res.setHeader('Content-Type', 'application/json');
        User.find(function (err, users) {
            if (err) return console.error(err);
            //console.log(users);
            res.send(JSON.stringify(users));
        });

    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/list', function (req, res, next) {
    if (conectado) {
        res.render('list', {
            title: 'API Rest Mongo'
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/get/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        var objeto = {

        };
        objeto._id = req.params.id;
        User.findOne(
            objeto,
            function (err, usuario) {
                if (err) return console.error(err);
                //console.log(users);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(usuario));
            }
        );
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/edita/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        var objeto = {

        };
        objeto._id = req.params.id;
        User.findOne(
            objeto,
            function (err, usuario) {
                if (err) return console.error(err);
                //console.log(users);
                res.render("edit", {
                    item: usuario
                });
            }
        );
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.post('/edit/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        var objetoModificado = {};
        objetoModificado._id = req.params.id;
        objetoModificado.username = req.body.nombre;
        objetoModificado.hash = req.body.pass;
        console.log(objetoModificado);
        User.findByIdAndUpdate(
            req.params.id,
            objetoModificado,
            function (err, usuario) {
                if (err) return console.error(err);
                console.log(usuario);
                User.findById(
                    req.params.id,
                    function (err, usuario) {
                        if (err) return console.error(err);
                        console.log(usuario);
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(usuario));
                    }
                );
            }
        );
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/borra/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        var objeto = {

        };
        objeto._id = req.params.id;
        User.findById(
            objeto,
            function (err, usuario) {
                if (err) return console.error(err);
                //console.log(users);
                res.render('borra', {
                    item: usuario
                });
            }
        );
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/delete/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        User.findByIdAndRemove(
            req.params.id,
            function (err, usuario) {
                if (err) return console.error(err);
                //console.log(users);
                //FALTA BORRAR
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(usuario));
            }
        );
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/show/:id', function (req, res, next) {
    console.log(req.params.id);
    if (conectado) {
        var objeto = {

        };
        objeto._id = req.params.id;
        User.findOne(
            objeto,
            function (err, usuario) {
                if (err) return console.error(err);
                //console.log(users);
                res.render('show', {
                    item: usuario
                });
            }
        );

    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/addForm', function (req, res, next) {
    if (conectado) {
        res.render('form', {
            title: 'API Rest Mongo'
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/addStatic', function (req, res, next) {

    if (conectado) {
        var usuario = new User({
            username: "pepesan"
        });
        usuario.save(function (err, userdevuelto) {
            if (err) {
                return console.error(err);
            } else {
                console.log("usuario guardado");
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(userdevuelto));
            }
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.post('/add', function (req, res, next) {
    if (conectado) {
        console.log(req.body);
        var usuario = new User({
            username: req.body.nombre,
            hash: req.body.pass
        });
        usuario.save(function (err, userdevuelto) {
            if (err) {
                return console.error(err);
            } else {
                console.log("usuario guardado");
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(userdevuelto));
            }
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});

module.exports = router;
