import { CollateralSectionUi } from './CollateralSection';
import type { VaultsDataType } from '@snx-v3/useVaultsData';
import { wei } from '@synthetixio/wei';

describe('Pool page / Collateral section', () => {
  it('should render without markets', () => {
    cy.viewport(800, 500);

    cy.mount(
      <CollateralSectionUi
        vaultsData={
          [
            {
              debt: wei(100),
              collateral: {
                amount: wei(50),
                value: wei(500),
              },
              collateralType: {
                tokenAddress: 'COLLATERAL_ADDRESS_SNX',
                symbol: 'SNX',
                displaySymbol: 'SNAXX',
                price: wei(10),
              },
            },
            {
              debt: wei(10),
              collateral: {
                amount: wei(1),
                value: wei(20),
              },
              collateralType: {
                tokenAddress: 'COLLATERAL_ADDRESS_OMG',
                symbol: 'OMG',
                displaySymbol: 'OMGWAT',
                price: wei(20),
              },
            },
          ] as VaultsDataType
        }
        poolName="POOL_NAME"
      />
    );
    cy.get('#app').should('include.text', 'Collateral Types').and('include.text', 'POOL_NAME');

    cy.get('[data-testid="pool tvl"]').should('have.text', '$520.00');
    cy.get('[data-testid="pool total debt"]').should('have.text', '$110.00');

    cy.get('[data-testid="pool collateral"][data-collateral="SNX"]')
      .should('exist')
      .within(() => {
        cy.get('[data-testid="collateral price"]').should('have.text', '$10.00');
        cy.get('[data-testid="collateral amount"]').should('have.text', '50.00 SNAXX');
        cy.get('[data-testid="collateral value"]').should('have.text', '$500.00');
        cy.get('[data-testid="collateral debt"]').should('have.text', '$100.00');
        cy.get('[data-testid="collateral cratio"]').should('have.text', '500%');
      });
    cy.get('[data-testid="pool collateral"][data-collateral="OMG"]')
      .should('exist')
      .within(() => {
        cy.get('[data-testid="collateral price"]').should('have.text', '$20.00');
        cy.get('[data-testid="collateral amount"]').should('have.text', '1.00 OMGWAT');
        cy.get('[data-testid="collateral value"]').should('have.text', '$20.00');
        cy.get('[data-testid="collateral debt"]').should('have.text', '$10.00');
        cy.get('[data-testid="collateral cratio"]').should('have.text', '200%');
      });
  });
});
