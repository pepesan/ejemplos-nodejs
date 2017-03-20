/*
    Primer ejemplo de código NodeJS en el servidor
*/

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var controladora = function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('Hello World\n');
};

const server = http.createServer(controladora);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

