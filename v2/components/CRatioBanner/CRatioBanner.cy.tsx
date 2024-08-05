import { Box } from '@chakra-ui/react';
import { CRatioBannerUi } from './CRatioBanner';

describe('CRatioBanner.cy.tsx', () => {
  it("doesn't render when claimed", () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBannerUi variant="success" isFlagged={false} hasClaimed={true} />
      </Box>
    );

    cy.get('[data-testid="c ratio banner wrapper"]').should('not.exist');
  });

  it('renders flagged', () => {
    cy.viewport(500, 300);
    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBannerUi variant="success" isFlagged={true} hasClaimed={false} />
      </Box>
    );

    cy.get(`[data-testid="c ratio banner wrapper"]`).should('exist');

    cy.get(`[data-testid="text content"]`).should('be.visible').should('include.text', 'Unflag');
  });

  it('renders error', () => {
    cy.viewport(500, 300);

    cy.mount(
      <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
        <CRatioBannerUi variant="error" isFlagged={false} hasClaimed={false} />
      </Box>
    );

    cy.get(`[data-testid="c ratio banner wrapper"]`).should('exist');
    cy.get(`[data-testid="text content"]`)
      .should('be.visible')
      .should('include.text', 'below the liquidation');
  });
});
