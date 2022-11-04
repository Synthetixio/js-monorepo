import { Box } from '@chakra-ui/react';
import { MainActionCardsUi } from './MainActionCards';

const greenColor = 'rgb(52, 237, 179)';
const cyanColor = 'rgb(46, 217, 255)';
const orangeColor = 'rgb(252, 135, 56)';
const redColor = 'rgb(255, 74, 96)';
const noColor = 'rgba(0, 0, 0, 0)';
describe('MainActionCards', () => {
  it('renders unclaimed rewards with a healthy c-ratio', () => {
    cy.viewport(1000, 1000);

    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          connectWallet={async () => {}}
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={350}
          nextEpochStartDate={new Date()}
          snxPrice="2.00"
          hasClaimed={false}
          isFlagged={false}
          isLoading={false}
        />
      </Box>
    );
    cy.get('[data-testid="stake button"]')
      .should('be.visible')
      .should('include.text', 'Stake & Borrow More')
      .should('have.css', 'background-color', noColor);

    cy.get('[data-testid="maintain button"]')
      .should('be.visible')
      .should('include.text', 'Maintain')
      .should('have.css', 'background-color', noColor);

    cy.get('[data-testid="collect button"]')
      .should('be.visible')
      .should('include.text', 'Claim your rewards')
      .should('have.css', 'background-color', greenColor);

    cy.get('[data-testid="burn badge"]')
      .should('be.visible')
      .should('include.text', 'Your ratio is looking healthy')
      .should('have.css', 'color', greenColor);

    cy.get('[data-testid="snx price"]').should('be.visible').should('include.text', '2.00');
  });
  it('renders claimed rewards with a healthy c-ratio', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          connectWallet={async () => {}}
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={350}
          nextEpochStartDate={new Date()}
          snxPrice="2.00"
          hasClaimed={true}
          isFlagged={false}
          isLoading={false}
        />
      </Box>
    );

    cy.get('[data-testid="stake button"]')
      .should('be.visible')
      .should('include.text', 'Stake & Borrow More')
      .should('have.css', 'background-color', noColor);
    cy.get('[data-testid="maintain button"]')
      .should('be.visible')
      .should('include.text', 'Maintain')
      .should('have.css', 'background-color', noColor);

    cy.get('[data-testid="collect button"]')
      .should('be.visible')
      .should('include.text', 'Rewards explained')
      .should('have.css', 'background-color', noColor);
  });
  it('renders unclaimed rewards with a unhealthy c-ratio', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          connectWallet={async () => {}}
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={300}
          nextEpochStartDate={new Date()}
          snxPrice="2.00"
          hasClaimed={false}
          isFlagged={false}
          isLoading={false}
        />
      </Box>
    );

    cy.get('[data-testid="maintain button"]')
      .should('be.visible')
      .should('include.text', 'Maintain')
      .should('have.css', 'background-color', orangeColor);
    cy.get('[data-testid="stake button"]')
      .should('be.visible')
      .should('include.text', 'Stake & Borrow More')
      .should('have.css', 'background-color', noColor);
    cy.get('[data-testid="collect button"]')
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
          connectWallet={async () => {}}
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={0}
          nextEpochStartDate={new Date()}
          snxPrice="2.00"
          hasClaimed={false}
          isFlagged={false}
          isLoading={false}
        />
      </Box>
    );

    cy.get('[data-testid="stake button"]')
      .should('be.visible')
      .should('include.text', 'Start Staking')
      .should('have.css', 'background-color', cyanColor);

    cy.get('[data-testid="maintain button"]')
      .should('be.visible')
      .should('include.text', 'C-Ratio explained')
      .should('have.css', 'background-color', noColor);
    cy.get('[data-testid="collect button"]')
      .should('be.visible')
      .should('include.text', 'Rewards explained')
      .should('have.css', 'background-color', noColor);
  });
  it('renders flagged', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          connectWallet={async () => {}}
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={140}
          nextEpochStartDate={new Date()}
          snxPrice="2.00"
          hasClaimed={false}
          isFlagged={true}
          isLoading={false}
        />
      </Box>
    );

    cy.get('[data-testid="maintain button"]')
      .should('be.visible')
      .should('include.text', 'Unflag')
      .should('have.css', 'background-color', redColor);

    cy.get('[data-testid="collect button"]')
      .should('be.visible')
      .should('include.text', 'Rewards explained')
      .should('have.css', 'background-color', noColor);

    cy.get('[data-testid="burn badge"]')
      .should('be.visible')
      .should('include.text', 'Adjust to collect weekly rewards')
      .should('have.css', 'color', redColor);
  });
});
