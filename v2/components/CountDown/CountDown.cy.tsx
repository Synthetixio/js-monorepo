import { CountDown } from './CountDown';

describe('CountdownUi', () => {
  it('toDate 1 day', () => {
    const oneDay = 1000 * 60 * 60 * 24;
    cy.clock();

    cy.viewport(500, 300);
    cy.mount(<CountDown toDate={new Date(oneDay)} />);

    cy.get(`[data-testid="countdown"]`).should('include.text', '01:00:00');
  });
  it('toDate 1 hour', () => {
    const oneHour = 1000 * 60 * 60;
    cy.clock();

    cy.viewport(500, 300);
    cy.mount(<CountDown toDate={new Date(oneHour)} />);

    cy.get(`[data-testid="countdown"]`).should('include.text', '00:01:00');
  });
  it('toDate 1 min', () => {
    const oneMin = 1000 * 60;
    cy.clock();

    cy.viewport(500, 300);
    cy.mount(<CountDown toDate={new Date(oneMin)} />);

    cy.get(`[data-testid="countdown"]`).should('include.text', '00:00:01');
  });
  it('decrease every second', () => {
    const oneHour = 1000 * 60 * 60;
    cy.clock();
    cy.viewport(500, 300);
    const toDate = new Date(oneHour);
    cy.mount(<CountDown toDate={toDate} />);

    cy.get(`[data-testid="countdown"]`).should('include.text', '00:01:00');
    cy.tick(1000);
    cy.mount(<CountDown toDate={toDate} />);
    cy.get(`[data-testid="countdown"]`).should('include.text', '00:00:59');
  });
});
