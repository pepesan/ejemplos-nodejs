
/*
1.- Todos los ejercicios deberán ser resueltos en una carpeta llamada ejercicio3
2.- Crea una aplicación express, arráncala y comprueba que se puede acceder correctamente a ella
*/
var express=require("express");
var bodyParser = require('body-parser');

var app=express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/",function(req,res){
   res.send("Has entrado a Express!!"); 
});
/*
3.- Gestiona las peticiones que entre por la URL (/libros) para los métodos Get y Post. Devuelve un texto que indique que método es el que se ha empleado para hacer la petición
*/
app.route("/libros")
    .get(function(req,res){
        res.send("Has enviado via GET");
    })
    .post(function(req,res){
        res.send("Has enviado via POSTº");
    }
);

/*
4.- Crea una nueva ruta en la aplicación que devuelva un listado html con las provincias de castilla y león accesible desde la url /provincias y el método get
*/
app.get("/provincias",function(req,res){
    res.send("<ul>"
    +"<li>Ávila</li>"
    +"<li>Salamanca</li>"
    +"<li>Zamora</li>"
    +"<li>León</li>"
    +"<li>Palencia</li>"
    +"<li>Burgos</li>"
    +"<li>Soria</li>"
    +"<li>Segovia</li>"
    +"<li>Valladolid</li>"         
    +"</ul>"); 
});
/*
5.- Crea una nueva ruta en la aplicación que sea capaz de recoger los datos de un formulario enviados vía post a la url /provincias.
action="/provincias" method="POST" 
Esto deberá devolver un objeto con los datos enviados por el formulario.
*/
app.post("/provincias",function(req,res){
    res.send(req.body);
});

/*
6.- Crea una nueva ruta variable que sea del tipo 
/get/miidentificativo donde mi midentificativo sea variable. Haz que devuelva el valor que se le ha dado cada vez a ese identificativo
*/
app.get("/get/:id",function(req,res){
    res.send(req.params.id);
});
/*
7.- Crea un nueva ruta para la edición y borrado de items ambas tendrán una ruta parecida al ejercicio 6
/edit/miiden /delete/miiden. En ambos casos se devolverá el identificativo. En el caso de la edición se enviará una petición POST, en el caso del borrado será GET.
*/
app.post("/edit/:id",function(req,res){
    console.log(req.body);
    res.send(req.params.id);
});
app.get("/delete/:id",function(req,res){
    res.send(req.params.id);
});

/*
8.- Pasa una seríe de parámetros por URL en el formato ?+&. Los datos a pasar son username y password. Devuelve true o false dependiendo de si ambos son "admin" la URL será /login y se hará via POST.
*/
// URL a generar /login?username=admin&password=admin
// la URL de arriba es parecida a esta /login/:username/:password
app.post("/login",function(req,res){
    var user=req.query.username;
    var pass=req.query.password;
    if(user=="admin" && pass=="admin"){
        res.send(true);
    }else{
        res.send(false);
    }
});

app.post("/loginCorrecto",function(req,res){
    var user=req.body;
    if(user.username=="admin" && user.password=="admin"){
        res.send(true);
    }else{
        res.send(false);
    }
})

app.listen(3000,function(){
    console.log("http://localhost:3000/ ");
})