var Book = require('../models/book');
var formidable = require('formidable');

var index=function(req, res, next) {
    Book.find({})
        .exec(function (err, list_books) {
            if (err) { return next(err); }
            //Successful, so render
            //console.log(list_books);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(list_books));
        });

};
var add=function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        delete fields._id;
        var libro=new Book(fields);
        libro.save(function (err) {
            if (err) { return next(err); }
            //Genre saved. Redirect to genre detail page
            //res.redirect(genre.url);
            console.log(libro);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(libro));
        });
        //res.render('books/show', { objeto: fields });
    });
};
var show=function (req, res, next) {
    var id=req.params.id;
    Book.findById(id)
        .exec(function (err, book) {
            if (err) { return next(err); }
            //Successful, so
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(book));
        });

};

var edit=function(req, res, next) {
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
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
            });
        //res.render('books/show', { objeto: fields });
    });
};

var deleteBook=function(req, res, next) {

    var id=req.params.id;
    Book.findByIdAndRemove(id,
        function(err, result){
            if (err) { return next(err); }
            //Genre saved. Redirect to genre detail page
            //res.redirect(genre.url);
            console.log(result);
            //res.render('books/delete', { id: id });
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        });

};
var app={
    index:index,
    add:add,
    show:show,
    edit:edit,
    deleteBook:deleteBook
};


module.exports=app;