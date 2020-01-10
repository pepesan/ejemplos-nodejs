var express = require('express');
var router = express.Router();
var librosController = require('../controllers/librosController')

/*
Vista AJAX del API
 */
router.get('/vista-ajax',librosController.vista);

/* GET home page. */
router.get('/', librosController.index);
router.post('/', librosController.add);
router.get('/:id', librosController.show);
router.put('/:id', librosController.edit);
router.delete('/:id', librosController.delete);


module.exports = router;
