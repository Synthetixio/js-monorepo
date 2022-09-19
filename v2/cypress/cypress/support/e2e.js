beforeEach(() => {
  cy.intercept('https://analytics.synthetix.io/matomo.js', { statusCode: 204 }).as('matomo');

  cy.intercept('POST', '/graphql', (req) => {
    req?.body?.forEach((gql) => {
      if (gql?.operationName && gql?.variables) {
        Cypress.log({
          name: 'graphql',
          message: `${gql.operationName}: ${JSON.stringify(gql.variables)}`,
          consoleProps: () => gql,
        });
      }
    });
  }).as('graphql');

  cy.window().then((w) => {
    w.localStorage.UNSAFE_IMPORT = 'true';
  });
});
