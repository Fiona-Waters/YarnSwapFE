// go through login process before running test
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

// navigate to the profile page and check the url
describe('Go to my profile', () => {
    it('passes', () => {
        cy.get('[href="/myprofile"] > .chakra-text').should("be.visible")
        cy.get('[href="/myprofile"] > .chakra-text').click()
        cy.wait(1000)
        cy.url().should('include', 'myprofile')
    })
})







