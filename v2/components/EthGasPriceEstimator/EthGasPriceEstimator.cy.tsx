import { Box } from '@chakra-ui/react';
import { EthGasPriceEstimatorUi } from './EthGasPriceEstimator';
import { wei } from '@synthetixio/wei';

describe('EthGasPriceEstimator.cy.tsx', () => {
  it('renders skeleton when missing data', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <EthGasPriceEstimatorUi gasSpeed="average" setGasSpeed={() => {}} />
      </Box>
    );
    cy.get('.chakra-skeleton').should('be.visible');
    cy.contains('p', 'Gas Price').should('be.visible');
  });
  it('renders dollar cost when data is available', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <EthGasPriceEstimatorUi
          gasSpeed="average"
          setGasSpeed={() => {}}
          transactionFee={wei(0.003)}
        />
      </Box>
    );
    cy.contains('[data-testid="transaction price"]', '$0.003').should('be.visible');
    cy.contains('p', 'Gas Price').should('be.visible');
  });
});
