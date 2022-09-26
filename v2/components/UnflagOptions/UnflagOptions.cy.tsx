import { Box } from '@chakra-ui/react';
import { UnflagOptionsUi } from './UnflagOptions';

describe('CRatioHealthCard.cy.tsx', () => {
  it('Render skeleton when missing data', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <UnflagOptionsUi
          selfLiquidationPenalty="20%"
          sUSDBalance={undefined}
          sUSDToGetBackToTarget={undefined}
        />
      </Box>
    );
    cy.get('.chakra-skeleton').should('be.visible');
  });
  it('Render option with correct content', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <UnflagOptionsUi
          selfLiquidationPenalty="20%"
          sUSDBalance={100}
          sUSDToGetBackToTarget={100}
        />
      </Box>
    );
    cy.contains(
      '[role="radiogroup"] label:nth-child(1)',
      'Unflag my account by burning sUSD in order to meet target ratio'
    ).should('be.visible');
    cy.contains('[role="radiogroup"] label:nth-child(1)', 'Burn sUSD to unflag').should(
      'be.visible'
    );
    cy.contains(
      '[role="radiogroup"] label:nth-child(2)',
      'Buy or Swap for sUSD in-order to burn to a healthy Collateralization Ratio'
    ).should('be.visible');
    cy.contains(
      '[role="radiogroup"] label:nth-child(2)',
      'In order to avoid liquidation and the penalty I want to buy sUSD.'
    ).should('be.visible');

    cy.contains('[role="radiogroup"] label:nth-child(3)', 'Self Liquidate (20% Penalty)').should(
      'be.visible'
    );
    cy.contains(
      '[role="radiogroup"] label:nth-child(3)',
      'Use the new Self Liquidation feature to clear your debt and unflag your account. Going down this route will incur a penalty of 20%'
    ).should('be.visible');
  });
  it('Render unflag option disabled when not enough sUSD balance', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <UnflagOptionsUi
          selfLiquidationPenalty="20%"
          sUSDBalance={90}
          sUSDToGetBackToTarget={100}
        />
      </Box>
    );
    cy.get('[role="radiogroup"] label:nth-child(1) input').should('be.disabled');
    cy.get('[role="radiogroup"] label:nth-child(2) input').should('not.be.disabled');
    cy.get('[role="radiogroup"] label:nth-child(3) input').should('not.be.disabled');
  });
  it('Clicking on an option makes it checked', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <UnflagOptionsUi
          selfLiquidationPenalty="20%"
          sUSDBalance={100}
          sUSDToGetBackToTarget={100}
        />
      </Box>
    );
    cy.get('[role="radiogroup"] label:nth-child(1)').click();
    cy.get('[role="radiogroup"] label:nth-child(1) input').should('be.checked');
    cy.get('[role="radiogroup"] label:nth-child(2) input').should('not.be.checked');
    cy.get('[role="radiogroup"] label:nth-child(3) input').should('not.be.checked');

    cy.get('[role="radiogroup"] label:nth-child(2)').click();
    cy.get('[role="radiogroup"] label:nth-child(1) input').should('not.be.checked');
    cy.get('[role="radiogroup"] label:nth-child(2) input').should('be.checked');
    cy.get('[role="radiogroup"] label:nth-child(3) input').should('not.be.checked');
  });
});
