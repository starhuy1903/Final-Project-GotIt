/// <reference types="cypress" />

import category from '../../fixtures/category.json';

const LIMIT = 20;

describe('category list page with user who is not logged in', () => {
  beforeEach(() => {
    cy.getCategoryList(0, LIMIT, category.categoryList);
    cy.visit('/categories');
  });

  it('should display the category list', () => {
    cy.wait('@getCategoryList').its('response.statusCode').should('eq', 200);

    cy.getByTestId('data-table').should('exist');
    cy.getByTestId('data-table').get('tbody tr').should('have.length', category.categoryList.items.length);
  });

  it('should show login confirm when user is not login but click into create category', () => {
    cy.getByTestId('create-btn').click();
    cy.getByTestId('login-confirm-msg').should('contain', 'You need to login to perform this action!');
    cy.getByTestId('cancel-btn').click();
    cy.getByTestId('login-confirm-msg').should('not.exist');
  });

  it('should show login confirm and go to login page', () => {
    cy.getByTestId('create-btn').click();
    cy.getByTestId('login-confirm-msg').should('contain', 'You need to login to perform this action!');
    cy.getByTestId('confirm-btn').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
  });
});

describe('category list page with user who is logged in', () => {
  beforeEach(() => {
    cy.login('huykst133@gmail.com', '12341234A');
    // intercept get category list
    cy.getCategoryList(0, LIMIT, category.categoryList);
    cy.visit('/categories');
  });

  it('should show create popup and can submit category form', () => {
    cy.getCategoryList(0, LIMIT, category.addedCategoryList);

    cy.intercept('POST', '/categories', {
      statusCode: 200,
      body: category.addedNewCategory
    }).as('createCategory');

    const { newCategory } = category;

    cy.getByTestId('create-btn').click();
    cy.getByTestId('category-form').should('exist');

    cy.getByTestId('name-input-control').type(newCategory.name);
    cy.getByTestId('description-input-control').type(newCategory.description);
    cy.getByTestId('image-input-control').type(newCategory.image_url);
    cy.getByTestId('submit-btn').click();

    cy.wait('@createCategory').its('response.statusCode').should('eq', 200);

    cy.wait('@getCategoryList');
    cy.getByTestId('data-table').should('exist');
    cy.getByTestId('data-table').get('tbody tr').should('have.length', category.addedCategoryList.items.length);
  });
});
