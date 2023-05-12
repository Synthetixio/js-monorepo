it('shows homepage to not connected wallet', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.visit('http://localhost:3000/pools/1');

  cy.get('#app').should('contain', 'TEST_POOL').and('contain', 'Pool #1');

  cy.get('[data-testid="pool collateral types"]')
    .should('contain', 'Collateral Types')
    .and('contain', 'TEST_POOL');
  cy.get('[data-testid="pool collateral"][data-collateral="SNX"]').should('exist');

  cy.get('[data-testid="pool markets"]').should('contain', 'Markets').and('contain', 'TEST_POOL');
});
