import {
  getLoginNameField,
  getLoginNamePassword,
  getLoginButton,
  getRightNav,
} from '../support/app.po';

describe('Login Tests', function () {
  it('Successful login', function () {
    cy.visit('/auth/login');
    getLoginNameField().type('duncan');
    getLoginNamePassword().type('123');
    getLoginButton().click();
    cy.url().should('contain', '/');
    getRightNav().contains('Products');
  });
  it('Unsuccessful login', function () {
    cy.visit('/auth/login');
    getLoginNameField().type('duncan');
    getLoginNamePassword().type('123');
    getLoginButton().click();
    cy.url().should('contain', '/');
    getRightNav().not('Products');
  });
});
