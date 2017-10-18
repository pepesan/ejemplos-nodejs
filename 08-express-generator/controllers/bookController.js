var list =function(req, res, next) {
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

    res.render(
        'books/index',
        {
            listado: [obj1,obj2,obj3],
            variable: "Listado de Libros"
        }
    );
};

var form=function(req, res, next) {
    var objeto={id:1,isbn:"",titulo:"",autores:"",sinopsis:""};
    res.render('books/add', { objeto: objeto });
};
var app={
    list:list,
    form:form
};

module.exports=app;