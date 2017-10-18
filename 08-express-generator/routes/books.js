var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var bookController=require("../controllers/bookController");
/* GET users listing. */
router.get('/', bookController.list);
/* GET users add form. */
router.get('/add', bookController.form);
/* POST users add form. */
router.post('/add', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //console.log(fields);
        //console.log(fields.id);
        res.render('books/show', { objeto: fields });
    });
});
/* GET users edit form. */
router.get('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    console.log(id);
    var objeto={
        id:id,
        isbn:"2131231",
        titulo:"Harry potter y la piedra filosofal",
        autores:"J.K. Rowling",
        sinopsis:"libro gueno gueno de magos y malotes"
    };
    res.render('books/add', { objeto: objeto });
});
/* POST users edit form. */
router.post('/edit/:id', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //console.log(fields);
        //fields.id=0;
        //console.log(fields.id);
        res.render('books/show', { objeto: fields });
    });
});
/* GET users listing. */
router.get('/delete/:id', function(req, res, next) {
    var id=req.params.id;
    res.render('books/delete', { id: id });
});
/* GET users listing. */
router.get('/delete/confirm/:id', function(req, res, next) {
    var id=req.params.id;
    res.render('books/delete-confirmed', { id: id });

});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var objeto={
        id:1,
        isbn:"2131231",
        titulo:"Harry potter y la piedra filosofal",
        autores:"J.K. Rowling",
        sinopsis:"liobro gueno gueno de magos y malotes"
    };
    res.render('books/show', { objeto: objeto });
});

module.exports = router;
