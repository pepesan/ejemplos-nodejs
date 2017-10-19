var Book = require('../models/book');
var formidable = require('formidable');

var list =function(req, res, next) {
    /*
    var obj1={
        id:1,
        isbn:"2131231",
        titulo:"Harry potter y la piedra filosofal",
        autores:"J.K. Rowling",
        sinopsis:"libro gueno gueno de magos y malotes"
    };
    var obj2={
        id:2,
        isbn:"2131231",
        titulo:"Harry potter y la camara secreta",
        autores:"J.K. Rowling",
        sinopsis:"Aparece el maligno una vez más"
    };
    var obj3={
        id:3,
        isbn:"2131231",
        titulo:"Harry potter y el prisionero de Azkaban",
        autores:"J.K. Rowling",
        sinopsis:"Hola Padrino, te quiero mucho!"
    };
    */

    Book.find({})
        .exec(function (err, list_books) {
            if (err) { return next(err); }
            //Successful, so render
            //console.log(list_books);
            res.render('books/index', {
                listado: list_books,
                variable: "Listado de Libros"
            });
        });
};

var form=function(req, res, next) {
    var objeto={isbn:"",title:"",author:"",summary:""};
    res.render('books/add', { objeto: objeto });
};

var save=function(req, res, next){
  //var libro=new Book(req.body);
    var objeto={
        //id:1,
        isbn:"2131231",
        title:"Harry potter y la piedra filosofal",
        author:"J.K. Rowling",
        summary:"libro gueno gueno de magos y malotes"
    };
    var libro=new Book(objeto);
  libro.save(function (err) {
      if (err) { return next(err); }
      //Genre saved. Redirect to genre detail page
      //res.redirect(genre.url);
      console.log(libro);
      res.redirect("/books/"+libro._id);
  });
};

var show=function (req, res, next) {
        /*
        var objeto={
            id:1,
            isbn:"2131231",
            titulo:"Harry potter y la piedra filosofal",
            autores:"J.K. Rowling",
            sinopsis:"liobro gueno gueno de magos y malotes"
        };
        */
    var id=req.params.id;
    Book.findById(id)
        .exec(function (err, book) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('books/show', { objeto: book });
        });

};


var saveForm=function (req, res, next) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            console.log(fields);
            //console.log(fields.id);
            delete fields._id;
            var libro=new Book(fields);
            libro.save(function (err) {
                if (err) { return next(err); }
                //Genre saved. Redirect to genre detail page
                //res.redirect(genre.url);
                console.log(libro);
                res.redirect("/books/"+libro._id);
            });
            //res.render('books/show', { objeto: fields });
        });
};
var showEditForm= function(req, res, next) {
    var id=req.params.id;
    Book.findById(id)
        .exec(function (err, book) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('books/add', { objeto: book });
        });

};
var processEditForm=function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //console.log(fields);
        //fields.id=0;
        //console.log(fields.id);
        var libro=new Book(fields);
        Book.findByIdAndUpdate(libro._id,{$set:libro},
            function(err, result){
            if (err) { return next(err); }
            //Genre saved. Redirect to genre detail page
            //res.redirect(genre.url);
            console.log(libro);
            res.redirect("/books/"+libro._id);
        });
        //res.render('books/show', { objeto: fields });
    });
};
var deleteBook=function(req, res, next) {
    var id=req.params.id;
    res.render('books/delete', { id: id });

};
var confirmDelete=function(req, res, next) {

    var id=req.params.id;
    Book.findByIdAndRemove(id,
        function(err, result){
            if (err) { return next(err); }
            //Genre saved. Redirect to genre detail page
            //res.redirect(genre.url);
            console.log(result);
            //res.render('books/delete', { id: id });
            res.redirect("/books/");
        });

};
var app={
    list:list,
    form:form,
    save:save,
    show:show,
    saveForm:saveForm,
    showEditForm:showEditForm,
    processEditForm:processEditForm,
    deleteBook:deleteBook,
    confirmDelete:confirmDelete
};

module.exports=app;