/// <reference types="cypress" />

describe('tests login screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.intercept('POST', '/auth').as('login');
  });

  it('should type in login form', () => {
    cy.get('#email-control').type('fake@email.com').should('have.value', 'fake@email.com');
    cy.get('#password-control').type('12341234A').should('have.value', '12341234A');
  });

  it('submit a empty form', () => {
    cy.get('[data-test-id="btn-control"]').click();
    cy.get('[data-test-id="email-feedback"]').should('contain', 'No email provided.');
    cy.get('[data-test-id="password-feedback"]').should('contain', 'No password provided.');
  });

  it('should show warning when click into input and blur, do not type anything', () => {
    cy.get('#email-control').focus();
    cy.get('[data-test-id="title"]').click();
    cy.get('#password-control').focus();
    cy.get('[data-test-id="title"]').click();
    cy.get('[data-test-id="email-feedback"]').should('contain', 'No email provided.');
    cy.get('[data-test-id="password-feedback"]').should('contain', 'No password provided.');
  });

  it('should success when submit correct email and password', () => {
    cy.get('#email-control').type('huykst133@gmail.com');
    cy.get('#password-control').type('12341234A');
    cy.get('[data-test-id="btn-control"]').click();
    cy.wait('@login');

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should fail when submit wrong email or password', () => {
    cy.get('#email-control').type('huykst133@gmail.com');
    cy.get('#password-control').type('1234');
    cy.get('[data-test-id="btn-control"]').click();
    cy.wait('@login');

    cy.url().should('eq', 'http://localhost:3000/login');
    cy.get('[role="alert"]').should('contain', 'Invalid email or password');
  });
});
