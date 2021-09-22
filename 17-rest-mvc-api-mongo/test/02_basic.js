let chai = require('chai');
let chaiHttp = require('chai-http');
const assert = require("assert");
chai.use(chaiHttp);
const expect = require('chai').expect;
var mainURL= "http://localhost:3000/";
describe('Página principal: ',()=>{
    it('GET / Devuelve un código 200', (done) => {
        // Código de la prueba
        // Petición web
        chai.request(mainURL)
            // Definición del método
            .get('')
            // Método que maneja el resultado de la prueba
            .end( function(err,res){
                //console.log(res);
                expect(res).to.have.status(200);
                // finalizar la prueba
                done();
            });
    });
    it('GET /api/getAll coge usuarios', (done) => {
        chai.request(mainURL)
            .get('api/getAll')
            .end( function(err,res){
                //console.log(res.body);
                const body = res.body;
                // comprobaciones
                expect(res).to.have.status(200);
                expect(body).to.be.an('Array');
                const item = body[0];
                expect(item._id).to.be.an('String');
                expect(item.username).to.be.an('String');
                expect(item.hash).to.be.an('String');
                expect(item.createdAt).to.be.an('String');
                expect(item.updatedAt).to.be.an('String');
                done();
            });
    });
    /*
    it('POST /users crea un usuario', (done) => {
        chai.request(mainURL)
            .post('/users')
            .send({
                "groups": [],
                "username": "admin",
                "password": "admin123"
            })
            .end( function(err,res){
                console.log(res.body);
                expect(res).to.have.status(200);
                // comprobaciones
                done();
            });
    });

     */
});
