var mongoose = require('mongoose');

var LibroSchema = new mongoose.Schema({
    titulo: {type: String, required: [true, "Obligatorio"], index: true},
    autor: String,
}, {timestamps: true,collection:"libros"});

/*
Clase libro para manejar los datos de un libro en memoria
 */
var Libro = mongoose.model("Libro", LibroSchema);

module.exports = Libro;


