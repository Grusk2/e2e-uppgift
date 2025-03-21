describe('Homepage', () => {
  it('visits the homepage', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Welcome')
  })
})
