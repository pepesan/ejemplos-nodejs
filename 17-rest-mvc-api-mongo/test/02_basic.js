let chai = require('chai');
let chaiHttp = require('chai-http');
const assert = require("assert");
chai.use(chaiHttp);
const expect = require('chai').expect;
var mainURL= "http://localhost:3000/";
var id= "";
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
            .set('Accept', 'application/json')
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
                expect(new Date(item.createdAt)).to.be.an("Date");
                //console.log(new Date(p.createdAt));
                expect(new Date(item.updatedAt)).to.be.an("Date");
                done();
            });
    });


    it('POST /api/add crea un usuario', (done) => {
        chai.request(mainURL)
            .post('api/add')
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .send({
                "nombre": "admin",
                "pass": "admin123"
            })
            .end( function(err,res){
                //console.log(res.body);
                // comprobaciones
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('Object');
                expect(res.body.username).to.be.an('String');
                expect(res.body.username).to.equal("admin");
                expect(res.body.username).to.be.an('String');
                expect(res.body.hash).to.equal("admin123");
                id = res.body._id;
                expect(new Date(res.body.createdAt)).to.be.an("Date");
                expect(new Date(res.body.updatedAt)).to.be.an("Date");
                done();
            });
    });
    it('Get /api/get/:id muestra un usuario por ID', (done) => {
        chai.request(mainURL)
            .get('api/get/'+id)
            .set('Accept', 'application/json')
            .end( function(err,res){
                // console.log(res.body);
                // comprobaciones
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('Object');
                //const item = res.body;
                expect(res.body.username).to.be.an('String');
                expect(res.body._id).to.equal(id);
                expect(new Date(res.body.createdAt)).to.be.an("Date");
                const item = res.body;
                done();
            });
    });
    it('POST /api/edit/:id modifica un usuario por ID', (done) => {
        chai.request(mainURL)
            .post('api/edit/'+id)
            .set('content-type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                "nombre": "admin2",
                "pass": "admin1232"
            })
            .end( function(err,res){
                //console.log(res.body);
                // comprobaciones
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('Object');
                expect(res.body.username).to.be.an('String');
                expect(res.body.username).to.equal("admin2");
                expect(res.body.hash).to.equal("admin1232");
                expect(new Date(res.body.createdAt)).to.be.an("Date");
                expect(new Date(res.body.updatedAt)).to.be.an("Date");
                done();
            });
    });
    it('get /api/delete/:id borra un usuario por ID', (done) => {
        chai.request(mainURL)
            .get('api/delete/'+id)
            .set('Accept', 'application/json')
            .end( function(err,res){
                // console.log(res.body);
                // comprobaciones
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('Object');
                expect(res.body._id).to.equal(id);
                //const item = res.body;
                expect(res.body.username).to.be.an('String');
                expect(new Date(res.body.createdAt)).to.be.an("Date");
                expect(new Date(res.body.updatedAt)).to.be.an("Date");
                done();
            });
    });
});
