describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4173/dashboard')
    cy.get("a [href='/dashboard]").children().contains("Dashboard")
  })
})