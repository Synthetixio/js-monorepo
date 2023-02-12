import { PoolUi } from './Pool';

describe('Pool Page', () => {
  it('should render Pool Page layout', () => {
    cy.viewport(800, 500);
    cy.mount(
      <PoolUi
        PoolHeader={() => <div>PoolHeader</div>}
        CollateralSection={() => <div>CollateralSection</div>}
        MarketSection={() => <div>MarketSection</div>}
      />
    );
    cy.contains('a', 'Home').should('exist');
    cy.contains('div', 'PoolHeader').should('exist');
    cy.contains('div', 'CollateralSection').should('exist');
    cy.contains('div', 'MarketSection').should('exist');
  });
});
