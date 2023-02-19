import { PoolHeaderUi } from './PoolHeader';

describe('Pool page / Header', () => {
  it('should render Pool Header', () => {
    cy.viewport(800, 500);
    cy.mount(
      <PoolHeaderUi
        poolData={{
          id: 'TEST_ID',
          name: 'TEST_POOL',
          total_weight: null,
          configurations: [],
        }}
      />
    );
    cy.get('#app')
      .should('include.text', 'TEST_POOL')
      .and('include.text', 'Pool #TEST_ID')
      .and('include.text', 'Spartan Council Pool');
  });
});
