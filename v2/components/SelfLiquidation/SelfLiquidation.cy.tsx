import { Box } from '@chakra-ui/react';
import { SelfLiquidationUi } from './SelfLiquidation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CRatioBoxUi } from '../CRatioBox';
import { CRatioProgressBarUi } from '@snx-v2/CRatioProgressBar';

const defaultTargetCratioPercentage = 300;
const defaultCurrentCratioPercentage = 200;
const defaultLiquidationRatioPercentage = 150;
const defaultTargetThreshold = 0.02;
const defaultProps = {
  selfLiquidationPenaltyPercent: 0.2,
  selfLiquidationPenaltyUSD: 20,
  selfLiquidationPenaltySNX: 10,
  totalAmountToLiquidateUSD: 100,
  totalAmountToLiquidateSNX: 50,
  amountToLiquidateToTargetUsd: 80,
  amountToLiquidateToTargetSNX: 40,
  gasError: null,
  isGasEnabledAndNotFetched: false,
  onSelfLiquidation: () => {},
  targetCRatioPercentage: defaultTargetCratioPercentage,
  currentCRatioPercentage: defaultCurrentCratioPercentage,
  CRatioBox: (
    <CRatioBoxUi
      targetCRatioPercentage={defaultTargetCratioPercentage}
      currentCRatioPercentage={defaultCurrentCratioPercentage}
      liquidationRatioPercentage={defaultLiquidationRatioPercentage}
      targetThreshold={defaultTargetThreshold}
    />
  ),
  CRatioProgressBar: (
    <CRatioProgressBarUi
      isLoading={false}
      targetCratioPercentage={defaultTargetCratioPercentage}
      currentCRatioPercentage={defaultCurrentCratioPercentage}
      liquidationCratioPercentage={defaultLiquidationRatioPercentage}
      targetThreshold={defaultTargetThreshold}
    />
  ),
};
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
            CRatioProgressBar={defaultProps.CRatioProgressBar}
            CRatioBox={defaultProps.CRatioBox}
            isLoading={true}
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
          <SelfLiquidationUi {...defaultProps} isLoading={false} />
        </QueryClientProvider>
      </Box>
    );
    cy.get(`[data-testid='c ratio progressbar']`).should('be.visible');
    cy.get(`[data-testid='current c-ratio text']`).should('be.visible');
    cy.get(`[data-testid='snx penalty']`).should('have.text', '10.00');
    cy.get(`[data-testid='usd penalty']`).should('have.text', '= $20.00');
    cy.get(`[data-testid='snx to target']`).should('have.text', '40.00');
    cy.get(`[data-testid='usd to target']`).should('have.text', '= $80.00');
    cy.get(`[data-testid='snx total']`).should('have.text', '50.00');
    cy.get(`[data-testid='usd total']`).should('have.text', '= $100.00');
    cy.get(`[data-testid='self liq button']`)
      .should('have.text', 'Yes I want to Self Liquidate')
      .should('not.be.disabled');
  });
  it('call onSelfLiquidation on click', () => {
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <QueryClientProvider client={new QueryClient()}>
          <SelfLiquidationUi
            {...defaultProps}
            onSelfLiquidation={cy.spy().as('onSelfLiquidationMock')}
            isLoading={false}
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
            {...defaultProps}
            targetCRatioPercentage={300}
            currentCRatioPercentage={300}
            isLoading={false}
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
          <SelfLiquidationUi {...defaultProps} gasError={Error('Gas Error')} isLoading={false} />
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
          <SelfLiquidationUi {...defaultProps} isGasEnabledAndNotFetched={true} isLoading={false} />
        </QueryClientProvider>
      </Box>
    );

    cy.get(`[data-testid='self liq button']`)
      .should('have.text', 'Yes I want to Self Liquidate')
      .should('be.disabled');
  });
});
