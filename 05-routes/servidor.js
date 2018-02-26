function init (route) {
    var server = require('http').createServer();
    var ModuloUrl = require('url');
    function control(petic, resp) {
        var urlProcesada = ModuloUrl.parse(petic.url);
        var pathName = urlProcesada.pathname;
        console.log('Petición recibida'); //Texto que saldrá por consola
        route(pathName);
        resp.writeHead(200, {'content-type': 'text/plain'});
        resp.write('Peticion recibida en el servidor: ' + pathName);
        resp.end();
    }
    server.on('request', control).listen(8080);
    console.log('Servidor inicializado: http://localhost:8080/');
}
exports.inicializar = init; //Exportamos la función