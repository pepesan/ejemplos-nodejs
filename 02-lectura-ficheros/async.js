/*
    Primer ejemplo de código Asíncrono NodeJS en el servidor
*/

const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

var html="";

var manejadoraServidor = function(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(html);
        res.end();
    };

var manejadoraFichero = function(err, info){
    const server = http.createServer(manejadoraServidor);
    html=info;
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
};

fs.readFile("./index.html",manejadoraFichero);





