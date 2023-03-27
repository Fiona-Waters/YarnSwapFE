before(() => {
    cy.visit('http://localhost:4173')
    cy.wait(1000)
    cy.get('[href="/login"] > .chakra-button').should("be.visible")
    cy.get('[href="/login"] > .chakra-button').click()
    cy.get('.chakra-text').contains("choose your preferred method")
    cy.get(':nth-child(2) > .firebaseui-idp-button').should("be.visible")
    cy.get(':nth-child(2) > .firebaseui-idp-button').click()
    cy.get('[name="email"]').type("ciaran.waters@gmail.com")
    cy.get('[type="submit"]').click()
    cy.get('[name="password"]').type("password")
    cy.get('[type="submit"]').click()
    cy.wait(1000)
    cy.url().should('include', '/dashboard')
})


describe('Create listing', () => {
    it('passes', () => {
        cy.get('.chakra-button').contains('Create Listing').click()
        cy.get('[data-cy="select-brand"]').select('Sirdar')
        cy.get('[data-cy="add-listing-colourway"]').type("green")
        cy.get('[data-cy="select-weight"]').select('DK')
        cy.get('[data-cy="select-fibre"]').select('Acrylic')
        cy.get('[data-cy="add-listing-unitWeight"]').type("100")
        cy.get('[data-cy="add-listing-meterage"]').type("250")
        cy.get('[data-cy="add-listing-swappable"]').click()
        cy.get('[data-cy="add-listing-image"]').click()
        cy.get('input[type=file]').selectFile('public/icon-192x192.png', {force: true})
        cy.wait(5000)
        cy.get('[type="submit"]').click()
        cy.wait(5000)
        



        







        




    })
})