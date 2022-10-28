import { Box } from '@chakra-ui/react';
import { SelfLiquidationUi } from './SelfLiquidation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('SelfLiquidationUi', () => {
  it('Render skeleton when missing data', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <QueryClientProvider client={new QueryClient()}>
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
        <QueryClientProvider client={new QueryClient()}>
          <SelfLiquidationUi
            onSelfLiquidation={() => {}}
            targetCRatioPercentage={300}
            liquidationRatioPercentage={150}
            currentCRatioPercentage={250}
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
    cy.get(`[data-testid='self liq button']`)
      .should('have.text', 'Yes I want to Self Liquidate')
      .should('not.be.disabled');
  });
  it('call onSelfLiquidation on click', () => {
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <QueryClientProvider client={new QueryClient()}>
          <SelfLiquidationUi
            onSelfLiquidation={cy.spy().as('onSelfLiquidationMock')}
            targetCRatioPercentage={300}
            liquidationRatioPercentage={150}
            currentCRatioPercentage={250}
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

    cy.get(`[data-testid='self liq button']`).click();

    cy.get('@onSelfLiquidationMock').should('have.been.called');
  });
  it('Renders button disabled when healthy c-ratio', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <QueryClientProvider client={new QueryClient()}>
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

    cy.get(`[data-testid='self liq button']`)
      .should('have.text', 'Yes I want to Self Liquidate')
      .should('be.disabled');
  });
  it('Renders button disabled when gas error', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <QueryClientProvider client={new QueryClient()}>
          <SelfLiquidationUi
            onSelfLiquidation={() => {}}
            targetCRatioPercentage={300}
            liquidationRatioPercentage={150}
            currentCRatioPercentage={100}
            selfLiquidationPenalty={0.2}
            selfLiquidationPenaltySNX={100}
            selfLiquidationPenaltyDollar={200}
            gasError={Error('Gas Error')}
            isGasEnabledAndNotFetched={false}
          />
        </QueryClientProvider>
      </Box>
    );

    cy.get(`[data-testid='self liq button']`)
      .should('have.text', 'Yes I want to Self Liquidate')
      .should('be.disabled');
    cy.get(`[data-testid='gas error']`).should('include.text', 'Gas Error');
  });
  it('Renders button disabled when gas enabled and not fetched', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <QueryClientProvider client={new QueryClient()}>
          <SelfLiquidationUi
            onSelfLiquidation={() => {}}
            targetCRatioPercentage={300}
            liquidationRatioPercentage={150}
            currentCRatioPercentage={100}
            selfLiquidationPenalty={0.2}
            selfLiquidationPenaltySNX={100}
            selfLiquidationPenaltyDollar={200}
            gasError={null}
            isGasEnabledAndNotFetched={true}
          />
        </QueryClientProvider>
      </Box>
    );

    cy.get(`[data-testid='self liq button']`)
      .should('have.text', 'Yes I want to Self Liquidate')
      .should('be.disabled');
  });
});
