import { Box } from '@chakra-ui/react';
import { EthGasPriceEstimatorUi } from './EthGasPriceEstimator';
import { wei } from '@synthetixio/wei';
import { BigNumber } from '@ethersproject/bignumber';

describe('CRatioHealthCard.cy.tsx', () => {
  it('renders skeleton when missing data', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <EthGasPriceEstimatorUi />
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
          ethPriceRate={wei(1300)}
          gasPrice={{ gasPrice: BigNumber.from(1001550) }}
          gasLimit={BigNumber.from(1001550)}
          optimismLayerOneFees={wei(0.000019461241517328)}
        />
      </Box>
    );
    cy.contains('p', '$0.0266').should('be.visible');
    cy.contains('p', 'Gas Price').should('be.visible');
  });
});
