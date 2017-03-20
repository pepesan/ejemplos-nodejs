/*
    Primer ejemplo de código Asíncrono NodeJS en el servidor
*/

const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile("./index.html",function(err, info){
            res.write(info);
            res.end();
        });
        
});
server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
});







