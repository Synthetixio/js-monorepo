import { Box } from '@chakra-ui/react';
import { CRatioProgressBarUi } from './CRatioProgressBar';

const green = 'rgb(52, 237, 179)';
const darkGreen = 'rgb(17, 148, 107)';
const orange = 'rgb(252, 135, 56)';
const darkOrange = 'rgb(150, 66, 10)';
const red = 'rgb(255, 74, 96)';
const darkRed = 'rgb(155, 44, 44)';

describe('no new c-ratio', () => {
  it('renders green and tooltops', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioProgressBarUi
          {...{
            targetThreshold: 0.05,
            isLoading: false,
            targetCratioPercentage: 400,
            liquidationCratioPercentage: 150,
            currentCRatioPercentage: 440,
          }}
        />
      </Box>
    );

    cy.get('[data-testid="highlighted progress bar"] [role="progressbar"]').should(
      'have.css',
      'background-color',
      green
    );
    cy.get('[data-testid="non highlighted progress bar"]').should('not.exist');
    cy.contains('p', 'Liquidation < 150%').find('span').trigger('mouseover');
    cy.root().should('contain', 'You may be flagged for liquidation');

    cy.contains('p', 'Target 400%').find('span').trigger('mouseover');
    cy.root().should('contain', 'Required to claim rewards');
  });

  it('renders orange', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioProgressBarUi
          {...{
            targetThreshold: 0.05,
            isLoading: false,
            targetCratioPercentage: 600,
            liquidationCratioPercentage: 100,
            currentCRatioPercentage: 200,
          }}
        />
      </Box>
    );

    cy.get('[data-testid="highlighted progress bar"] [role="progressbar"]').should(
      'have.css',
      'background-color',
      orange
    );
    cy.get('[data-testid="non highlighted progress bar"]').should('not.exist');
  });
  it('renders red', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioProgressBarUi
          {...{
            targetThreshold: 0.05,
            isLoading: false,
            targetCratioPercentage: 200,
            liquidationCratioPercentage: 100,
            currentCRatioPercentage: 50,
          }}
        />
      </Box>
    );

    cy.get('[data-testid="highlighted progress bar"] [role="progressbar"]').should(
      'have.css',
      'background-color',
      red
    );
    cy.get('[data-testid="non highlighted progress bar"]').should('not.exist');
  });
});

describe('with new c-ratio', () => {
  it('renders green when new cratio is above target', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioProgressBarUi
          {...{
            targetCratioPercentage: 350,
            liquidationCratioPercentage: 100,
            currentCRatioPercentage: 310,
            newCratioPercentage: 400,
            targetThreshold: 0.05,
            isLoading: false,
          }}
        />
      </Box>
    );

    cy.get('[data-testid="highlighted progress bar"] [role="progressbar"] ').should(
      'have.css',
      'background-color',
      green
    );
    cy.get('[data-testid="non highlighted progress bar"] [role="progressbar"]').should(
      'have.css',
      'background-color',
      darkGreen
    );
  });
  it('renders orange when new cratio is below target', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioProgressBarUi
          {...{
            targetCratioPercentage: 350,
            liquidationCratioPercentage: 100,
            currentCRatioPercentage: 400,
            newCratioPercentage: 200,
            targetThreshold: 0.05,
            isLoading: false,
          }}
        />
      </Box>
    );

    cy.get('[data-testid="highlighted progress bar"] [role="progressbar"]').should(
      'have.css',
      'background-color',
      orange
    );
    cy.get('[data-testid="non highlighted progress bar"] [role="progressbar"]').should(
      'have.css',
      'background-color',
      darkOrange
    );
  });
  it('renders red when new cratio is below liq ratio', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioProgressBarUi
          {...{
            targetCratioPercentage: 350,
            liquidationCratioPercentage: 100,
            currentCRatioPercentage: 400,
            newCratioPercentage: 50,
            targetThreshold: 0.05,
            isLoading: false,
          }}
        />
      </Box>
    );

    cy.get('[data-testid="highlighted progress bar"] [role="progressbar"]').should(
      'have.css',
      'background-color',
      red
    );
    cy.get('[data-testid="non highlighted progress bar"] [role="progressbar"]').should(
      'have.css',
      'background-color',
      darkRed
    );
  });
});

it('avoids overlapping labels when really large c-ratio', () => {
  cy.viewport(500, 300);
  cy.mount(
    <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
      <CRatioProgressBarUi
        {...{
          targetCratioPercentage: 350,
          liquidationCratioPercentage: 100,
          currentCRatioPercentage: 1500,
          targetThreshold: 0.05,
          isLoading: false,
        }}
      />
    </Box>
  );

  cy.get('[data-testid="current c-ration triangle"]').should('not.be.visible');
});
