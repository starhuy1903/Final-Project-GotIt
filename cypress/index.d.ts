/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email: string, password:string): void,
    checkToken(token: string): void,
    getByTestId(id: string): Cypress.Chainable<>,
    getCategoryList(offset: number, limit: number, responseData: any): void,
  }
}
