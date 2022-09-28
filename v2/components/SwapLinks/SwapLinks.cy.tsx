import { Box } from '@chakra-ui/react';
import { SwapLinksUi } from './SwapLinks';

describe('UnflagOptionsUi.cy.tsx', () => {
  it('Render skeleton when missing data', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <SwapLinksUi />
      </Box>
    );
    cy.get('.chakra-skeleton').should('be.visible');
  });
  it('Render correct links for mainnet', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <SwapLinksUi networkId={1} outputCurrencyAddress="susdAddressMainnet" />
      </Box>
    );
    cy.get(`[data-testid=oneInchLink]`)
      .should('have.attr', 'href')
      .and('eq', 'https://app.1inch.io/#/1/unified/swap/ETH/sUSD');
    cy.get(`[data-testid=curveLink]`)
      .should('have.attr', 'href')
      .and('eq', 'https://curve.fi/susdv2');
    cy.get(`[data-testid=cowSwapLink]`)
      .should('have.attr', 'href')
      .and(
        'eq',
        'https://swap.cow.fi/#/swap?inputCurrency=ETH&outputCurrency=susdAddressMainnet&chain=mainnet'
      );
    cy.get(`[data-testid=sushiSwapLink]`)
      .should('have.attr', 'href')
      .and(
        'eq',
        'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=susdAddressMainnet'
      );
  });
  it('Render correct links for optimism', () => {
    cy.viewport(600, 500);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <SwapLinksUi networkId={10} outputCurrencyAddress="susdAddressOptimism" />
      </Box>
    );
    cy.get(`[data-testid=oneInchLink]`)
      .should('have.attr', 'href')
      .and('eq', 'https://app.1inch.io/#/10/unified/swap/ETH/sUSD');
    cy.get(`[data-testid=curveLink]`)
      .should('have.attr', 'href')
      .and('eq', 'https://optimism.curve.fi/factory/0');
    cy.get(`[data-testid=cowSwapLink]`).should('not.exist');

    cy.get(`[data-testid=sushiSwapLink]`)
      .should('have.attr', 'href')
      .and(
        'eq',
        'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=susdAddressOptimism'
      );
  });
});
