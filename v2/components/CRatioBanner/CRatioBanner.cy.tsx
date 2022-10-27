import { Box } from '@chakra-ui/react';
import { CRatioBannerUi } from './CRatioBanner';

describe('CRatioBanner.cy.tsx', () => {
  it("doesn't render when claimed", () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBannerUi
          nextEpochStartDate={new Date()}
          variant="success"
          isFlagged={false}
          hasClaimed={true}
        />
      </Box>
    );

    cy.get('[data-testid="c ratio banner wrapper"]').should('not.exist');
  });
  it('renders flagged', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBannerUi
          nextEpochStartDate={new Date(Date.now() + 100000)}
          variant="success"
          isFlagged={true}
          hasClaimed={false}
        />
      </Box>
    );

    cy.get(`[data-testid="c ratio banner wrapper"]`).should('exist');
    cy.get(`[data-testid="countdown"]`).should('exist');

    cy.get(`[data-testid="text content"]`).should('be.visible').should('include.text', 'Unflag');
  });
  it('renders success', () => {
    const oneMin = 1000 * 60 * 60;
    cy.clock(0);

    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBannerUi
          nextEpochStartDate={new Date(oneMin)}
          variant="success"
          isFlagged={false}
          hasClaimed={false}
        />
      </Box>
    );

    cy.get(`[data-testid="c ratio banner wrapper"]`).should('exist');
    cy.get(`[data-testid="text content"]`)
      .should('be.visible')
      .should('include.text', 'now collect');
  });
  it('renders warning', () => {
    cy.clock(0);

    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBannerUi
          nextEpochStartDate={new Date()}
          variant="warning"
          isFlagged={false}
          hasClaimed={false}
        />
      </Box>
    );

    cy.get(`[data-testid="c ratio banner wrapper"]`).should('exist');
    cy.get(`[data-testid="countdown"]`).should('exist');

    cy.get(`[data-testid="text content"]`)
      .should('be.visible')
      .should('include.text', 'below target');
  });
  it('renders error', () => {
    cy.viewport(500, 300);
    cy.clock();

    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBannerUi
          nextEpochStartDate={new Date()}
          variant="error"
          isFlagged={false}
          hasClaimed={false}
        />
      </Box>
    );

    cy.get(`[data-testid="c ratio banner wrapper"]`).should('exist');
    cy.get(`[data-testid="countdown"]`).should('exist');
    cy.get(`[data-testid="text content"]`)
      .should('be.visible')
      .should('include.text', 'below the liquidation');
  });
});
