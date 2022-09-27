import { Box } from '@chakra-ui/react';
import { CRatioHealthCardUi } from './CRatioHealthCard';

describe('CRatioHealthCard.cy.tsx', () => {
  it('renders skeleton', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioHealthCardUi
          {...{
            targetCratioPercentage: undefined,
            liquidationCratioPercentage: undefined,
            currentCRatioPercentage: undefined,
          }}
        />
      </Box>
    );
    cy.contains('h2', 'Collateralization Ratio Health').should('be.visible');
    cy.get('.chakra-skeleton').should('be.visible');
  });
  it('renders green', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioHealthCardUi
          {...{
            targetCratioPercentage: 400,
            liquidationCratioPercentage: 150,
            currentCRatioPercentage: 440,
          }}
        />
      </Box>
    );
    cy.contains('h2', 'Collateralization Ratio Health').should('be.visible');
    cy.contains('p', '440%').should('be.visible');

    cy.contains('p', 'Liquidated < 150%').find('span').trigger('mouseover');
    cy.root().should('contain', 'You may be flagged for liquidation');

    cy.contains('p', 'Target 400%').find('span').trigger('mouseover');
    cy.root().should('contain', 'Required to claim rewards');

    cy.get('[role="progressbar"]').should('have.css', 'background-color', 'rgb(52, 237, 179)');
  });

  it('renders orange', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioHealthCardUi
          {...{
            targetCratioPercentage: 600,
            liquidationCratioPercentage: 100,
            currentCRatioPercentage: 200,
          }}
        />
      </Box>
    );
    cy.contains('h2', 'Collateralization Ratio Health').should('be.visible');
    cy.contains('p', '200%').should('be.visible');
    cy.contains('p', 'Liquidated < 100%').should('be.visible');
    cy.contains('p', 'Target 600%').should('be.visible');

    cy.get('[role="progressbar"]').should('have.css', 'background-color', 'rgb(252, 135, 56)');
  });

  it('renders red', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioHealthCardUi
          {...{
            targetCratioPercentage: 200,
            liquidationCratioPercentage: 100,
            currentCRatioPercentage: 50,
          }}
        />
      </Box>
    );

    cy.contains('h2', 'Collateralization Ratio Health').should('be.visible');
    cy.contains('p', '50%').should('be.visible');
    cy.contains('p', 'Liquidated < 100%').should('be.visible');
    cy.contains('p', 'Target 200%').should('be.visible');

    cy.get('[role="progressbar"]').should('have.css', 'background-color', 'rgb(255, 74, 96)');
  });
});
