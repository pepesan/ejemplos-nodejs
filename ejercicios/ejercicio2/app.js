#!/usr/bin/env node

var express=require("express");
var app=express();
console.log("App.js arrancado!!!");


app.get("/",function(req,res){
    res.send("GET de barra");
});

app.get("/miget",function(req,res){
    console.log("estoy en miget");
    res.send("<h1>miGET</h1>");
});

app.get("/otroGet",function(req,res){
    res.send("<h1>Otro Get</h1>");
});


//lanzamiento del servidor
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});