var express = require('express');
var app=express();
app.get('/api', function (req, res) {
 res.send('devuelve listado');
});
app.post('/api', function (req, res) {
 res.send('añade un objeto');
});
app.get('/api/:id', function (req, res) {
 res.send('muestra un objeto por id ' + req.params.id);
});
app.put('/api/:id', function (req, res) {
 res.send('modifica un objeto por id ' + req.params.id);
});
app.delete('/api/:id', function (req, res) {
 res.send('borra un objeto por id' + req.params.id);
});
app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
