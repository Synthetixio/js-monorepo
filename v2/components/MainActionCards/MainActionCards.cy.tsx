import { Box } from '@chakra-ui/react';
import { MainActionCardsUi } from './MainActionCards';

describe('MainActionCards', () => {
  it('renders skeleton', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi />
      </Box>
    );
    cy.get('.chakra-skeleton').should('be.visible');
  });
  it('renders unclaimed rewards with a healthy c-ratio', () => {
    cy.viewport(1000, 1000);

    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={350}
          nextEpochStartDate={new Date()}
          snxPrice="2.00"
          hasClaimed={false}
          isFlagged={false}
        />
      </Box>
    );
    cy.get('[data-testid="main stake button"]')
      .should('be.visible')
      .should('include.text', 'Stake & Borrow More');
    cy.get('[data-testid="main maintain button"]')
      .should('be.visible')
      .should('include.text', 'Maintain');
    cy.get('[data-testid="main collect button"]')
      .should('be.visible')
      .should('include.text', 'Claim your rewards');
    cy.get('[data-testid="burn badge"]')
      .should('be.visible')
      .should('include.text', 'Your ratio is looking healthy');
    cy.get('[data-testid="snx price"]').should('be.visible').should('include.text', '2.00');
  });
  it('renders claimed rewards with a healthy c-ratio', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={350}
          nextEpochStartDate={new Date()}
          snxPrice="2.00"
          hasClaimed={true}
          isFlagged={false}
        />
      </Box>
    );

    cy.get('[data-testid="rewards explained button"]')
      .should('be.visible')
      .should('include.text', 'Rewards explained');
  });
  it('renders unclaimed rewards with a unhealthy c-ratio', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={300}
          nextEpochStartDate={new Date()}
          snxPrice="2.00"
          hasClaimed={false}
          isFlagged={false}
        />
      </Box>
    );

    cy.get('[data-testid="main maintain button"]')
      .should('be.visible')
      .should('include.text', 'Maintain');
    cy.get('[data-testid="rewards explained button"]')
      .should('be.visible')
      .should('include.text', 'Rewards explained');
    cy.get('[data-testid="burn badge"]')
      .should('be.visible')
      .should('include.text', 'Adjust to collect weekly rewards');
  });
  it('renders not staking', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={0}
          nextEpochStartDate={new Date()}
          snxPrice="2.00"
          hasClaimed={false}
          isFlagged={false}
        />
      </Box>
    );

    cy.get('[data-testid="start staking button"]')
      .should('be.visible')
      .should('include.text', 'Start Staking');
    cy.get('[data-testid="not staking maintain button"]')
      .should('be.visible')
      .should('include.text', 'C-Ratio explained');
    cy.get('[data-testid="rewards explained button"]')
      .should('be.visible')
      .should('include.text', 'Rewards explained');
  });
  it('renders flagged', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={160}
          nextEpochStartDate={new Date()}
          snxPrice="2.00"
          hasClaimed={false}
          isFlagged={true}
        />
      </Box>
    );

    cy.get('[data-testid="main maintain button"]')
      .should('be.visible')
      .should('include.text', 'Unflag');
    cy.get('[data-testid="rewards explained button"]')
      .should('be.visible')
      .should('include.text', 'Rewards explained');
    cy.get('[data-testid="burn badge"]')
      .should('be.visible')
      .should('include.text', 'Adjust to collect weekly rewards');
  });
});
