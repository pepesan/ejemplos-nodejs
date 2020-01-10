var express = require('express');
var router = express.Router();
var librosController = require('../controllers/librosController')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
var conectado = false;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conexion abierta");
    conectado = true;

});
/*
Vista AJAX del API
 */
router.get('/vista-ajax',librosController.vista);

/* GET home page. */
router.get('/', librosController.index);
router.post('/', librosController.add);
router.get('/search', librosController.search);
router.get('/:id', librosController.show);
router.put('/:id', librosController.edit);
router.delete('/:id', librosController.delete);


module.exports = router;
