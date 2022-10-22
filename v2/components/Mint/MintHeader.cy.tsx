import { Box } from '@chakra-ui/react';
import { MintHeaderUi } from './MintHeader';

describe('MintHeader', () => {
  it('Render skeleton when missing data', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MintHeaderUi />
      </Box>
    );
    cy.get('.chakra-skeleton').should('be.visible');
  });
  it('Renders current c ratio healthy', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MintHeaderUi
          liquidationRatioPercentage={150}
          targetCRatioPercentage={350}
          currentCRatioPercentage={400}
          isDebtDataLoading={false}
        />
      </Box>
    );
    cy.get('[data-testid="current c-ratio badge"]')
      .should('be.visible')
      .should('include.text', '400%')
      .should('have.css', 'color', 'rgb(71, 250, 194)');
    cy.get('[data-testid="target-ratio badge"]')
      .should('be.visible')
      .should('include.text', '350%')
      .should('have.css', 'color', 'rgb(71, 250, 194)');
    cy.get('[data-testid="new c-ratio badge"]').should('not.exist');
  });
  it('Renders current c ratio below current c-ratio', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MintHeaderUi
          liquidationRatioPercentage={150}
          targetCRatioPercentage={350}
          currentCRatioPercentage={300}
          isDebtDataLoading={false}
        />
      </Box>
    );
    cy.get('[data-testid="current c-ratio badge"]')
      .should('be.visible')
      .should('include.text', '300%')
      .should('have.css', 'color', 'rgb(255, 154, 84)');
    cy.get('[data-testid="target-ratio badge"]')
      .should('be.visible')
      .should('include.text', '350%')
      .should('have.css', 'color', 'rgb(71, 250, 194)');
    cy.get('[data-testid="new c-ratio badge"]').should('not.exist');
  });

  it('Renders current c ratio below liq ratio', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MintHeaderUi
          liquidationRatioPercentage={150}
          targetCRatioPercentage={350}
          currentCRatioPercentage={140}
          isDebtDataLoading={false}
        />
      </Box>
    );
    cy.get('[data-testid="current c-ratio badge"]')
      .should('be.visible')
      .should('include.text', '140%')
      .should('have.css', 'color', 'rgb(255, 74, 96)');
    cy.get('[data-testid="target-ratio badge"]')
      .should('be.visible')
      .should('include.text', '350%')
      .should('have.css', 'color', 'rgb(71, 250, 194)');
    cy.get('[data-testid="new c-ratio badge"]').should('not.exist');
  });
  it('Renders new c-ratio badge', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MintHeaderUi
          liquidationRatioPercentage={150}
          targetCRatioPercentage={350}
          currentCRatioPercentage={500}
          isDebtDataLoading={false}
          collateral={100}
          SNXRate={2}
          debtBalance={50}
          mintAmountSUSD={5}
        />
      </Box>
    );
    cy.get('[data-testid="new c-ratio badge"]')
      .should('be.visible')
      .should('include.text', '364%')
      .should('have.css', 'color', 'rgb(71, 250, 194)');
  });
});
