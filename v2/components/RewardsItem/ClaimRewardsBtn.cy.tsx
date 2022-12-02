import { Box } from '@chakra-ui/react';
import { ClaimRewardsBtn } from './ClaimRewardsBtn';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const orangeColor = 'rgb(252, 135, 56)';
const cyanColor = 'rgb(46, 217, 255)';
const disabledColor = 'rgb(48, 48, 55)';

it('Renders maintain button when variant is not success', () => {
  cy.viewport(1000, 1000);
  cy.mount(
    <QueryClientProvider client={new QueryClient()}>
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <ClaimRewardsBtn variant="warning" />
      </Box>
    </QueryClientProvider>
  );
  cy.get('[data-testid="claim rewards button"]')
    .should('be.visible')
    .should('include.text', 'Maintain')
    .should('have.css', 'background-color', orangeColor)
    .should('not.be.disabled');
});
it('Renders cyan claim not disable when we have rewards to claim ', () => {
  cy.viewport(1000, 1000);
  cy.mount(
    <QueryClientProvider client={new QueryClient()}>
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <ClaimRewardsBtn variant="success" amountsUSD={10} />
      </Box>
    </QueryClientProvider>
  );
  cy.get('[data-testid="claim rewards button"]')
    .should('be.visible')
    .should('include.text', 'Claim')
    .should('have.css', 'background-color', cyanColor)
    .should('not.be.disabled');
});
it('Renders cyan claim  disable when we dont have any rewards to claim ', () => {
  cy.viewport(1000, 1000);
  cy.mount(
    <QueryClientProvider client={new QueryClient()}>
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <ClaimRewardsBtn variant="success" amountsUSD={0} />
      </Box>
    </QueryClientProvider>
  );
  cy.get('[data-testid="claim rewards button"]')
    .should('be.visible')
    .should('include.text', 'Claim')
    .should('have.css', 'background-color', disabledColor)
    .should('be.disabled');
});
