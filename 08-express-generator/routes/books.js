var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var bookController=require("../controllers/bookController");
/* GET users listing. */
router.get('/', bookController.list);
/* GET users add form. */
router.get('/add', bookController.form);
/* POST users add form. */
router.post('/add', bookController.saveForm);
/* GET users edit form. */
router.get('/edit/:id',bookController.showEditForm);
/* POST users edit form. */
router.post('/edit/:id', bookController.processEditForm);
/* GET users listing. */
router.get('/delete/:id', bookController.deleteBook);
/* GET users listing. */
router.get('/delete/confirm/:id', bookController.confirmDelete);
/* GET users listing. */
router.get('/save',bookController.save );


/* GET users listing. */
router.get('/:id', bookController.show);

module.exports = router;
