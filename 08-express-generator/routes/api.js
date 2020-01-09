var express = require('express');
var router = express.Router();
var api=require("../controllers/apiController");
/* Estandar by Pepesan */
router.get('/', api.index);
router.post('/', api.add);
router.get('/:id', api.show);
router.post('/edit/:id', api.edit);
router.put('/:id', api.edit);
router.get('/delete/:id', api.deleteBook);
router.delete('/:id', api.deleteBook);

/*
 # Standart de facto
 # Get / Listado
router.get('/', api.index);
 # POST / Añadir (datos)
router.post('/', api.add);
 # GET /:id Obtener un objeto por ID
router.get('/:id', api.show);
 # PUT /:id Modificar un objeto por ID
router.put('/:id', api.edit);
 # Delete /:id Borrar un objeto por ID
router.delete('/:id', api.deleteBook);
 */

module.exports = router;
