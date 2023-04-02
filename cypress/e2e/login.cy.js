// go through login process
describe('Login spec', () => {
    it('passes', () => {
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
  })

  