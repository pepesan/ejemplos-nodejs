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
var formidable = require('formidable');
var fs = require('fs');
/*
router.use(function(req,res,next){
    if(conectado){
        var session=req.session;
        next();
    }else{
        res.render('errorDB', {
            title: 'Mongo No arrancado',
            message: 'Mongo No arrancado',
            error:"No se ha podido conectar a la BBDD"
        });
    }
});
*/
function cogeLogin(session){
    return session.usuario;
}
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
        user=cogeLogin(req.session);
        console.log(req.session);
        console.log(user);
        res.render('list', {
            title: 'API Rest Mongo',
            usuario:user
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/get/:id', function (req, res, next) {
    //console.log(req.params.id);
        var objeto = {

        };
        objeto._id = req.params.id;
        User.findOne(
            //{_id:req.params.id}
            objeto,
            function (err, usuario) {
                if (err) return console.error(err);
                //console.log(users);
                
                res.setHeader('Content-Type', 'application/json');
                if(usuario.username==req.session.usuario.username){
                    res.send(JSON.stringify(usuario));    
                }else{
                    var error={error:"No son tus datos"};
                    res.send(JSON.stringify(error));    
                }
                
            }
        );


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
        if(req.body.pass){
            objetoModificado.hash = req.body.pass;  
            objetoModificado.salt = crypto.randomBytes(16).toString('hex');
            objetoModificado.hash = crypto.pbkdf2Sync(objetoModificado.hash, objetoModificado.salt, 10000, 512, 'sha512').toString('hex');
        }
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
                    item: usuario,
                    title:"Borrar usuario?"
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
            //, otro_campo:"otro valor"
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
        usuario.setPassword(req.body.pass);
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
router.get('/registerForm', function (req, res, next) {
    if (conectado) {
        res.render('register', {
            title: 'API Rest Mongo'
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});

router.post('/register', function (req, res, next) {
    if (conectado) {
        console.log(req.body);
        var usuario = new User({
            username: req.body.nombre,
        });
        usuario.setPassword(req.body.pass);
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
router.get('/loginForm', function (req, res, next) {
    if (conectado) {
        res.render('login', {
            title: 'API Rest Mongo'
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});

router.post('/login', function (req, res, next) {
    if (conectado) {
        //console.log(req.body);
        var usuario = new User({
            username: req.body.nombre,
            hash: req.body.pass
        });
        var objeto = {

        };
        objeto.username = usuario.username;
        User.findOne(
            objeto,
            function (err, user) {
                if (err) return console.error(err);
                //console.log(user);
                if(user!=null && user.validPassword(usuario.hash)){
                    //login correcto
                    res.setHeader('Content-Type', 'application/json');
                    //guardo el objeto en sesión
                    var session=req.session;
                    session.usuario=user;
                    //TODO Corregir que no se envie la contraseña
                    user.hash="";
                    user.salt="";
                    console.log(user);
                    res.send(JSON.stringify(user));
                }else{
                    //login incorrecto
                    res.render('errorDB', {
                        title: 'Login incorrecto'
                    });
                } 
            }
        );
        /*
        usuario.save(function (err, userdevuelto) {
            if (err) {
                return console.error(err);
            } else {
                console.log("usuario guardado");
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(userdevuelto));
            }
        });
        */
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/loginCheck', function (req, res, next) {
    if (conectado) {
        var session=req.session;
        res.setHeader('Content-Type', 'application/json');
        var objetoDevuelto={
            login:true,
            
        };
        if(session.usuario){
            objetoDevuelto.usuario=session.usuario;
            res.send(JSON.stringify(objetoDevuelto));
        }else{
            objetoDevuelto.login=false;
            res.send(JSON.stringify(objetoDevuelto));
        }
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get('/logout', function (req, res, next) {
    if (conectado) {
        var session=req.session;
        delete session.usuario;
        res.render('logout', {
            title: 'Mongo No arrancado',
            session:session
        });
        
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
router.get("/uploadFileForm",function(req,res){
    console.log("presentando Formulario");
    res.render("upload", {
        title: 'Subir Fichero'
    });
});
router.post("/uploadFile",function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = __dirname+'/../public/uploads/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    }
    );
});
router.get("/search/:query",function(req,res){
    if (conectado) {
        res.setHeader('Content-Type', 'application/json');
        var query=req.params.query;

        var objetoBusqueda={
            
        };
        objetoBusqueda.username={ "$regex": query, "$options": "i" };
        //console.log(objetoBusqueda);
        User.find(objetoBusqueda).limit(10).exec(function (err, users) {
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
router.get("/search/:query/pag/:pag",function(req,res){
    if (conectado) {
        res.setHeader('Content-Type', 'application/json');
        var query=req.params.query;
        var pag;
        if(req.params.query!=undefined){
            pag=req.params.query;
        }else{
            pag=0;
        }
        var objetoBusqueda={
            
        };
        objetoBusqueda.username={ "$regex": query, "$options": "i" };
        //console.log(objetoBusqueda);
        User.find(objetoBusqueda).skip(pag*10).limit(10).exec(function (err, users) {
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
router.get('/views', function(req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
module.exports = router;
