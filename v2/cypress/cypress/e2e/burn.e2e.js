describe('burn', () => {
  it('should burn sUSD', () => {
    cy.on('window:before:load', async (win) => {
      win.localStorage.STAKING_V2_ENABLED = 'true';
    });

    cy.window().then(async () => {
      const Synthetix = await import(
        '@synthetixio/contracts/build/mainnet/deployment/Synthetix.js'
      );
      const { ethers } = await import('ethers');

      const wallet = Cypress.env('WALLET_ADDRESS');
      const provider = new ethers.providers.JsonRpcProvider(Cypress.env('TENDERLY_RPC_URL'));
      const signer = provider.getSigner(wallet);
      const SynthetixContract = new ethers.Contract(Synthetix.address, Synthetix.abi, signer);
      const debt = parseFloat(
        ethers.utils.formatUnits(
          await SynthetixContract.debtBalanceOf(wallet, ethers.utils.formatBytes32String('sUSD'))
        )
      );
      cy.log(`Debt sUSD: ${debt}`);
      if (debt < 1) {
        cy.log('Not enough debt to burn, minting 1 sUSD');
        const mintTx = await SynthetixContract.issueSynths(
          ethers.utils.hexValue(ethers.utils.parseEther('1').toHexString())
        );
        const receipt = await mintTx.wait();
        cy.log(`Mint TX ${receipt.transactionHash}`);
      }
    });

    const TIMEOUT_TX = 120000;
    const TIMEOUT_DATA_FETCH = 30000;

    cy.visit('http://localhost:3000/staking/burn');

    cy.get('[data-testid="burn header"]', { timeout: TIMEOUT_DATA_FETCH }).should('be.visible');

    cy.get('[data-testid="burn available susd balance"]', { timeout: TIMEOUT_DATA_FETCH })
      .should('be.visible')
      .within(($0) => cy.wrap(parseFloat($0.data('balance'))).should('be.gte', 1));

    cy.get('[data-testid="burn susd amount input"]').type(1);

    cy.get('[data-testid="burn submit"]').should('be.visible').should('not.be.disabled').click();

    cy.get('[data-testid="transaction modal"]', { timeout: TIMEOUT_TX })
      .should('be.visible')
      .should('include.text', 'Transaction completed')
      .should('include.text', 'Unstaking')
      .should('include.text', 'SNX')
      .should('include.text', 'Burning')
      .should('include.text', '1 sUSD');

    cy.contains('[data-testid="transaction modal"] button', 'Close')
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    cy.get('[data-testid="transaction modal"]').should('not.exist');
  });
});
