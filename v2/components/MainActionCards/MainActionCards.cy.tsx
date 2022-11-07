import { Box } from '@chakra-ui/react';
import { MainActionCardsUi } from './MainActionCards';

const greenColor = 'rgb(52, 237, 179)';
const cyanColor = 'rgb(46, 217, 255)';
const orangeColor = 'rgb(252, 135, 56)';
const redColor = 'rgb(255, 74, 96)';
const noColor = 'rgba(0, 0, 0, 0)';
const disabledColor = 'rgb(48, 48, 55)';

describe('MainActionCards', () => {
  it('renders unclaimed rewards with a healthy c-ratio', () => {
    cy.viewport(1000, 1000);

    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          connectWallet={async () => {}}
          walletAddress="vitalik.eth"
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={350}
          nextEpochStartDate={new Date()}
          rewardsDollarValue={100}
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

    cy.get('[data-testid="value of rewards"]')
      .should('be.visible')
      .should('include.text', '100.00');
  });
  it('renders claimed rewards with a healthy c-ratio', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          connectWallet={async () => {}}
          walletAddress="vitalik.eth"
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={350}
          nextEpochStartDate={new Date()}
          rewardsDollarValue={0}
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
    cy.get('[data-testid="value of rewards"]').should('not.exist');
  });
  it('renders unclaimed rewards with a unhealthy c-ratio', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          connectWallet={async () => {}}
          walletAddress="vitalik.eth"
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={300}
          nextEpochStartDate={new Date()}
          rewardsDollarValue={100}
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
      .should('include.text', 'Claim your rewards')
      .should('be.disabled')
      .should('have.css', 'background-color', disabledColor);

    cy.get('[data-testid="burn badge"]')
      .should('be.visible')
      .should('include.text', 'Adjust to collect weekly rewards');
  });
  it('renders unclaimed rewards with a healthy c-ratio', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          connectWallet={async () => {}}
          walletAddress="vitalik.eth"
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={400}
          nextEpochStartDate={new Date()}
          rewardsDollarValue={100}
          hasClaimed={false}
          isFlagged={false}
          isLoading={false}
        />
      </Box>
    );

    cy.get('[data-testid="maintain button"]')
      .should('be.visible')
      .should('include.text', 'Maintain')
      .should('have.css', 'background-color', noColor);
    cy.get('[data-testid="stake button"]')
      .should('be.visible')
      .should('include.text', 'Stake & Borrow More')
      .should('have.css', 'background-color', noColor);
    cy.get('[data-testid="collect button"]')
      .should('be.visible')
      .should('include.text', 'Claim your rewards')
      .should('have.css', 'background-color', greenColor);

    cy.get('[data-testid="burn badge"]')
      .should('be.visible')
      .should('include.text', 'Your ratio is looking healthy')
      .should('have.css', 'color', greenColor);
  });

  it('renders not staking', () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          connectWallet={async () => {}}
          walletAddress="vitalik.eth"
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={0}
          nextEpochStartDate={new Date()}
          rewardsDollarValue={0}
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
          walletAddress="vitalik.eth"
          liquidationCratioPercentage={150}
          targetCratioPercentage={350}
          currentCRatioPercentage={140}
          nextEpochStartDate={new Date()}
          rewardsDollarValue={100}
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
      .should('include.text', 'Claim your rewards')
      .should('have.css', 'background-color', disabledColor);

    cy.get('[data-testid="burn badge"]')
      .should('be.visible')
      .should('include.text', 'Adjust to collect weekly rewards')
      .should('have.css', 'color', redColor);
  });
  it('calls connectWallet when no wallet address', () => {
    cy.viewport(1000, 1000);

    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <MainActionCardsUi
          connectWallet={cy.spy().as('connectWallet')}
          walletAddress={null}
          liquidationCratioPercentage={0}
          targetCratioPercentage={0}
          currentCRatioPercentage={0}
          nextEpochStartDate={new Date()}
          rewardsDollarValue={100}
          hasClaimed={false}
          isFlagged={false}
          isLoading={false}
        />
      </Box>
    );

    cy.get('[data-testid="stake button"]')
      .should('be.visible')
      .should('include.text', 'Start Staking')
      .should('have.css', 'background-color', cyanColor)
      .click();
    cy.get('@connectWallet').should('have.been.called');
  });
});
