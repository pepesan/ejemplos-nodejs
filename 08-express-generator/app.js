//Dependencia principal
var express = require('express');
//módulo de node https://nodejs.org/api/path.html
var path = require('path');
//módulo que maneja el favicon https://www.npmjs.com/package/serve-favicon
var favicon = require('serve-favicon');
//Módulo que maneja el log https://www.npmjs.com/package/morgan
var logger = require('morgan');
//módulo que pone a funcionar req.cookies
var cookieParser = require('cookie-parser');
//módulo que permite req.body (datos de formulario/post)
var bodyParser = require('body-parser');

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/test';
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, {
    useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//configuración de rutas
var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//uso de ficheros estáticos a partir de una ruta
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/books', books);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
