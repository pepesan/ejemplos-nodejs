/*
Clase libro para manejar los datos de un libro en memoria
 */
class Libro{
    constructor(id=0, titulo="", autor="") {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
    }
}

module.exports = Libro;
