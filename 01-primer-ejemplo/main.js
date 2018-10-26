#!/usr/bin/env node

/*
 Primer ejemplo de código NodeJS en el servidor
 */
var http = require('http');
http.createServer(function (req, res) {
    console.log("Petición aceptada");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080/');