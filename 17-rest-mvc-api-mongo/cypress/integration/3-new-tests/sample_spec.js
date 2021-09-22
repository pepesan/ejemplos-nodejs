//const expect = require('chai').expect;

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
    })
    it('request get /api/getAll', () => {
        cy.request('GET', 'api/getAll')
            .its('body')
            .as('currentUsers')
        cy.get('@currentUsers').should((response) => {
            console.log(response);
            expect(response[0]).to.have.property('_id')
            expect(response[0]).to.have.property('_id',"614b2938d92b305b5c192228")
            //expect(response).to.have.status(200)
            //expect(response).to.have.property('headers')
            //expect(response).to.have.property('duration')
        })
    })
    /*
    it('request post /api/add', () => {
        cy.request('POST', 'api/add', {
            name: 'admin',
            pass: 'admin123'
        })
        .its('body')
        .as('currentUser')
        cy.get('@currentUser').should((response) => {
            console.log(response);
            expect(response).to.have.property('_id')
            expect(response).to.have.property('username','admin')
            //expect(response).to.have.status(200)
            //expect(response).to.have.property('headers')
            //expect(response).to.have.property('duration')
        })
    })


     */

})
