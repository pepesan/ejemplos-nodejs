var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
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
        var objeto={
            
        };
        objeto._id=req.params.id;
        User.findOne(
            objeto,
            function(err,usuario){
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
router.post('/edit/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        var objeto={
            
        };
        objeto._id=req.params.id;
        User.findOne(
            objeto,
            function(err,usuario){
                if (err) return console.error(err);
                //console.log(users);
                //FALTA MODIFICAR EN BBDD
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
router.get('/delete/:id', function (req, res, next) {
    //console.log(req.params.id);
    if (conectado) {
        var objeto={
            
        };
        objeto._id=req.params.id;
        User.findOne(
            objeto,
            function(err,usuario){
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
        res.render('list', {
            title: 'API Rest Mongo'
        });
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
            hash:req.body.pass
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
