import { Box } from '@chakra-ui/react';
import { CRatioProgressBarUi } from './CRatioProgressBar';

const green = 'rgb(52, 237, 179)';
const darkGreen = 'rgb(17, 148, 107)';
const orange = 'rgb(252, 135, 56)';
const darkOrange = 'rgb(150, 66, 10)';
const red = 'rgb(255, 74, 96)';
const darkRed = 'rgb(155, 44, 44)';

describe('CRatioProgressBarUi', () => {
  describe('no new c-ratio', () => {
    it('renders green', () => {
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
});
