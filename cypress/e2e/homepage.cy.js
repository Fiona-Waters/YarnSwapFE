// navigate to the home page and check for the register button, 
// click it and check that the text contains what is specified
describe('Homepage spec', () => {
    it('passes', () => {
      cy.visit('http://localhost:4173')
      cy.wait(1000)
      cy.get('[href="/register"] > .chakra-button').should("be.visible")
      cy.get('[href="/register"] > .chakra-button').click()
      cy.get('.chakra-text').contains("choose your preferred method")

    })
  })

  