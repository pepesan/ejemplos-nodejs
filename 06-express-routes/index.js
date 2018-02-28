var express = require('express');
var app=express();

app.get('/', function (req, res) {
  res.send('http://localhost:3000/  !');
    res.end();
});

app.post('/', function (req, res) {
  res.send('Got a POST request');
});

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

app.get('/about', function (req, res) {
  res.send('about');
});

app.get('/random.text', function (req, res) {
  res.send('random.text');
});

//Esta vía de acceso de ruta coincidirá con acd y abcd.
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

//Esta vía de acceso de ruta coincidirá con abcd, abbcd, abbbcd, etc.
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

//Esta vía de acceso de ruta coincidirá con abcd, abxcd, abRABDOMcd, ab123cd, etc.
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});

//Esta vía de acceso de ruta coincidirá con /abe y /abcde.
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});

//Esta vía de acceso de ruta coincidirá con cualquier valor con una “w” en el nombre de la ruta.
app.get(/w/, function(req, res) {
  res.send('/w/');
});

//Esta vía de acceso de ruta coincidirá con butterfly y dragonfly, pero no con butterflyman, dragonfly man, etc.
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});

//Más de una función de devolución de llamada puede manejar una ruta (asegúrese de especificar el objeto next).
app.get('/example/b',
    function (req, res, next) {
      console.log('the response will be sent by the next function ...');
      next();
    },
    function (req, res) {
    res.send('Hello from B!');
  }
);

//Una matriz de funciones de devolución de llamada puede manejar una ruta.

var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
};

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
};

var cb2 = function (req, res) {
  res.send('Hello from C!');
};

app.get('/example/c', [cb0, cb1, cb2]);

/*
Métodos de respuesta
Los métodos en el objeto de respuesta (res) de la tabla siguiente pueden enviar una respuesta al cliente y terminar el ciclo de solicitud/respuestas. Si ninguno de estos métodos se invoca desde un manejador de rutas, la solicitud de cliente se dejará colgada.

Método	Descripción
res.download()	Solicita un archivo para descargarlo.
res.end()	Finaliza el proceso de respuesta.
res.json()	Envía una respuesta JSON.
res.jsonp()	Envía una respuesta JSON con soporte JSONP.
res.redirect()	Redirecciona una solicitud.
res.render()	Representa una plantilla de vista.
res.send()	Envía una respuesta de varios tipos.
res.sendFile	Envía un archivo como una secuencia de octetos.
res.sendStatus()	Establece el código de estado de la respuesta y envía su representación de serie como el cuerpo de respuesta.
*/


//Puede crear manejadores de rutas encadenables para una vía de acceso de ruta utilizando app.route().
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
//parámetro por URL
app.get('/book/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
});

//parámetros por URL
app.get('/thins/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});
//parámetros por URL
app.get('/users/:userId/books/:bookId', function (req, res) {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
    console.log(req.params.length);
  res.send(req.params)
});
/*
//para parámetros pasados por URL 
//URL:   /search?text=criterio_de_busqueda
segundo parámetro &oq=cursosdedesarrollo

dos  parametros ?p1=12&p2=16
p1=12
p2=16
*/



app.get("/search",function(req,res){
    var criterio=req.query.text;
    //console.log(criterio);
    res.send(req.query);
});




//Utilice la clase express.Router para crear manejadores de rutas montables y modulares.
//llama al fichero birds.js
var birds = require('./birds');
//lo asigna a una ruta
app.use('/birds', birds);



//manejo de controladores ejemplo práctico

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var cookie_controller=require("./controllers/cookieController");

//Cookies: res.cookies
app.get("/cookies",cookie_controller.imprimeCookies);
//Mandar cookies
app.get("/sendCookies",cookie_controller.mandaCookies);

//Redirección
app.get("/redirect",function (req,res){
    res.redirect(302,"/cookies");
});

//lanzamiento del servidor
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
