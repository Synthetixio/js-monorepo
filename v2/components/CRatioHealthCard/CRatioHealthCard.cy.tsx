import { Box } from '@chakra-ui/react';
import { CRatioHealthCardUi } from './CRatioHealthCard';

it('renders green', () => {
  cy.viewport(500, 300);
  cy.mount(
    <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
      <CRatioHealthCardUi
        CRatioProgressBar={<div role="progressbar">Im a progress bar</div>}
        isLoading={false}
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

  cy.get('[role="progressbar"]').should('be.visible');
});

it('renders orange', () => {
  cy.viewport(500, 300);
  cy.mount(
    <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
      <CRatioHealthCardUi
        CRatioProgressBar={<div role="progressbar">Im a progress bar</div>}
        isLoading={false}
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

  cy.get('[role="progressbar"]').should('be.visible');
});

it('renders red', () => {
  cy.viewport(500, 300);
  cy.mount(
    <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
      <CRatioHealthCardUi
        CRatioProgressBar={<div role="progressbar">Im a progress bar</div>}
        isLoading={false}
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

  cy.get('[role="progressbar"]').should('be.visible');
});
