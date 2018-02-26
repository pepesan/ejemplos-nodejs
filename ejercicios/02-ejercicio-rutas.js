/*
1.- Crea una carpeta llamada ejercicio2 (mkdir)
2.- Métete en la carpeta ejercicio2 (cd)
3.- Haz un npm init para crear el fichero package.json (el fichero principal se llamará app.js)
4.- Mete las dependencias de express (npm install express --save)
5.- Crea un fichero app.js donde meteremos el código de node-express
6.- Mete en el fichero app.js la llamada al require de express y la variable app:
#!/usr/bin/env node

var express=require("express");
var app=express();


//lanzamiento del servidor
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

7.- Crea una nueva ruta accesible desde la url /miget con el método get. Haz que saque un mensaje por consola y devuelva por la respuesta "<h1>miGET</h1>"

app.get("/miget",function(req,res){
    console.log("estoy en miget");
    res.send("<h1>miGET</h1>");
});

8.- Crea una nueva ruta desde la url /otroGet con el método get. Haz que devuelva la respuesta "<h1>Otro Get</h1>"

app.get("/otroGet",function(req,res){
    res.send("<h1>Otro Get</h1>");
});
*/