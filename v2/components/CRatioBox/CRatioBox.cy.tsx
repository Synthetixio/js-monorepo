import { Box } from '@chakra-ui/react';
import { CRatioBoxUi } from './CRatioBox';

const greenColor = 'rgb(52, 237, 179)';
const orangeColor = 'rgb(252, 135, 56)';
const redColor = 'rgb(255, 74, 96)';

describe('CratioBox', () => {
  it('Render skeleton when missing data', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBoxUi />
      </Box>
    );
    cy.get('.chakra-skeleton').should('be.visible');
  });
  it('Renders current c ratio healthy', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBoxUi
          liquidationRatioPercentage={150}
          targetCRatioPercentage={350}
          currentCRatioPercentage={400}
        />
      </Box>
    );
    cy.get('[data-testid="current c-ratio text"]')
      .should('be.visible')
      .should('include.text', '400%')
      .should('have.css', 'color', greenColor);
    cy.get('[data-testid="target-ratio text"]')
      .should('be.visible')
      .should('include.text', '350%')
      .should('have.css', 'color', greenColor);
    cy.get('[data-testid="healthy badge"]').should('be.visible').should('include.text', 'HEALTHY');

    cy.get('[data-testid="new c-ratio text"]').should('not.exist');
  });
  it('Renders current c ratio below current c-ratio', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBoxUi
          liquidationRatioPercentage={150}
          targetCRatioPercentage={350}
          currentCRatioPercentage={300}
        />
      </Box>
    );
    cy.get('[data-testid="current c-ratio text"]')
      .should('be.visible')
      .should('include.text', '300%')
      .should('have.css', 'color', orangeColor);

    cy.get('[data-testid="target-ratio text"]')
      .should('be.visible')
      .should('include.text', '350%')
      .should('have.css', 'color', greenColor);

    cy.get('[data-testid="healthy badge"]')
      .should('be.visible')
      .should('include.text', 'UNHEALTHY');

    cy.get('[data-testid="new c-ratio text"]').should('not.exist');
  });

  it('Renders current c ratio below liq ratio', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBoxUi
          liquidationRatioPercentage={150}
          targetCRatioPercentage={350}
          currentCRatioPercentage={140}
        />
      </Box>
    );
    cy.get('[data-testid="current c-ratio text"]')
      .should('be.visible')
      .should('include.text', '140%')
      .should('have.css', 'color', redColor);

    cy.get('[data-testid="target-ratio text"]')
      .should('be.visible')
      .should('include.text', '350%')
      .should('have.css', 'color', greenColor);

    cy.get('[data-testid="healthy badge"]')
      .should('be.visible')
      .should('include.text', 'UNHEALTHY');

    cy.get('[data-testid="new c-ratio text"]').should('not.exist');
  });

  it('Renders new c-ratio going from warning to healthy', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBoxUi
          liquidationRatioPercentage={150}
          targetCRatioPercentage={350}
          currentCRatioPercentage={200}
          newCratioPercentage={500}
        />
      </Box>
    );
    cy.get('[data-testid="new c-ratio text"]')
      .should('be.visible')
      .should('include.text', '500%')
      .should('have.css', 'color', greenColor);
    cy.get('[data-testid="healthy badge"]').should('be.visible').should('include.text', 'HEALTHY');
  });
  it('Renders new c-ratio being 0', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBoxUi
          liquidationRatioPercentage={150}
          targetCRatioPercentage={350}
          currentCRatioPercentage={200}
          newCratioPercentage={0}
        />
      </Box>
    );
    cy.get('[data-testid="new c-ratio text"]')
      .should('be.visible')
      .should('include.text', 'N/A')
      .should('have.css', 'color', 'rgb(255, 255, 255)');
    cy.get('[data-testid="healthy badge"]')
      .should('be.visible')
      .should('include.text', 'DEBT CLEARED');
  });
});
