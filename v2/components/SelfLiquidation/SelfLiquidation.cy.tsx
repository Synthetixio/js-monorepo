import { Box } from '@chakra-ui/react';
import { SelfLiquidationUi } from './SelfLiquidation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('SelfLiquidationUi', () => {
  it('Render skeleton when missing data', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <QueryClientProvider client={new QueryClient()} contextSharing={true}>
          <SelfLiquidationUi
            onSelfLiquidation={() => {}}
            gasError={null}
            isGasEnabledAndNotFetched={false}
          />
        </QueryClientProvider>
      </Box>
    );
    cy.get('.chakra-skeleton').should('be.visible');
  });
  it('Renders data', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <QueryClientProvider client={new QueryClient()} contextSharing={true}>
          <SelfLiquidationUi
            onSelfLiquidation={() => {}}
            targetCRatioPercentage={300}
            liquidationRatioPercentage={150}
            currentCRatioPercentage={300}
            selfLiquidationPenalty={0.2}
            selfLiquidationPenaltySNX={100}
            selfLiquidationPenaltyDollar={200}
            gasError={null}
            isGasEnabledAndNotFetched={false}
          />
        </QueryClientProvider>
      </Box>
    );
    cy.get(`[data-testid='c ratio progressbar']`).should('be.visible');
    cy.get(`[data-testid='current c-ratio badge']`).should('be.visible');
    cy.get(`[data-testid='snx penalty']`).should('have.text', '100.00');
    cy.get(`[data-testid='usd penalty']`).should('have.text', '= $200.00');
  });
});
