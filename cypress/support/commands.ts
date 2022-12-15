import '..';

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('#email-control').type(email);
  cy.get('#password-control').type(password);
  cy.get('[data-test-id="btn-control"]').click();
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});

Cypress.Commands.add('checkToken', (token) => {
  cy.window().its('localStorage.token').should('eq', token);
});

Cypress.Commands.add('getByTestId', (id: string) =>
  cy.get(`[data-test-id="${id}"]`));

Cypress.Commands.add('getCategoryList', (offset: number, limit: number, responseData: any) => {
  cy.intercept('GET', `/categories?offset=${offset}&limit=${limit}`, {
    statusCode: 200,
    body: responseData,
  }).as('getCategoryList');
});
