//const expect = require('chai').expect;
var id;
describe('My First Test', () => {
    it('Does not do much!', () => {
        expect(true).to.equal(true)
    })
    it('Visits the Kitchen Sink', () => {
        cy.visit('https://example.cypress.io')
        cy.contains('type')
        cy.contains('type').click()
        cy.url().should('include', '/commands/actions')
        cy.get('.action-email')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')
    })
    it('successfully loads', () => {
        cy.visit('http://localhost:3000') // change URL to match your dev URL
        cy.visit('/')
        cy.visit('/')
    })
    it('request get /api/getAll', () => {
        cy.request('GET', 'api/getAll')
            .its('body')
            .as('currentUsers')
        cy.get('@currentUsers').should((response) => {
            console.log(response);
            expect(response[0]).to.have.property('_id')
            expect(response[0]).to.have.property('_id',"614341b036020a04940d3267")
            //expect(response).to.have.status(200)
            //expect(response).to.have.property('headers')
            //expect(response).to.have.property('duration')
        })
    })

    it('request post /api/add', () => {
        cy.request('POST', 'api/add', {
            nombre: 'admin',
            pass: 'admin123'
        })
        .its('body')
        .as('currentUser')
        cy.get('@currentUser').should((response) => {
            console.log(response);
            expect(response).to.have.property('_id')
            expect(response).to.have.property('username','admin')
            expect(response).to.have.property('hash','admin123')
            id = response._id;
            //expect(response).to.have.status(200)
            //expect(response).to.have.property('headers')
            //expect(response).to.have.property('duration')
        })
    })
    it('request get /api/get/:id', () => {
        cy.request('GET', 'api/get/'+ id)
            .its('body')
            .as('currentUser')
        cy.get('@currentUser').should((response) => {
            console.log(response);
            expect(response).to.have.property('_id')
            expect(response).to.have.property('_id', id)
            expect(response).to.have.property('username', "admin")
            //expect(response[0]).to.have.property('_id',"614b2938d92b305b5c192228")
            //expect(response).to.have.status(200)
            //expect(response).to.have.property('headers')
            //expect(response).to.have.property('duration')
        })
    })
    it('request post /api/edit/:id', () => {
        cy.request('POST', 'api/edit/'+ id,{
            nombre: 'admin2',
            pass: 'admin12312'
        })
            .its('body')
            .as('currentUser')
        cy.get('@currentUser').should((response) => {
            console.log(response);
            expect(response).to.have.property('_id')
            expect(response).to.have.property('_id',id)
            expect(response).to.have.property('username', "admin2")
            expect(response).to.have.property('hash', "admin12312")
            //expect(response[0]).to.have.property('_id',"614b2938d92b305b5c192228")
            //expect(response).to.have.status(200)
            //expect(response).to.have.property('headers')
            //expect(response).to.have.property('duration')
        })
    })
    it('request get /api/delete/:id', () => {
        cy.request('GET', 'api/delete/'+ id)
            .its('body')
            .as('currentUser')
        cy.get('@currentUser').should((response) => {
            console.log(response);
            expect(response).to.have.property('_id')
            expect(response).to.have.property('_id',id)
            expect(response).to.have.property('username', "admin2")
            expect(response).to.have.property('hash', "admin12312")
            //expect(response[0]).to.have.property('_id',"614b2938d92b305b5c192228")
            //expect(response).to.have.status(200)
            //expect(response).to.have.property('headers')
            //expect(response).to.have.property('duration')
        })
    })


})
