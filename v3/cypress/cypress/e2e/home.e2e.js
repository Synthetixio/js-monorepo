it('shows homepage to unauthorised user', () => {
  cy.visit('http://localhost:3000');
  cy.get('#app').should('contain', 'Welcome to Synthetix V3');
});
