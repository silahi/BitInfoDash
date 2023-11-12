import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('NetworkSecurity e2e test', () => {
  const networkSecurityPageUrl = '/network-security';
  const networkSecurityPageUrlPattern = new RegExp('/network-security(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const networkSecuritySample = {};

  let networkSecurity;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/network-securities+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/network-securities').as('postEntityRequest');
    cy.intercept('DELETE', '/api/network-securities/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (networkSecurity) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/network-securities/${networkSecurity.id}`,
      }).then(() => {
        networkSecurity = undefined;
      });
    }
  });

  it('NetworkSecurities menu should load NetworkSecurities page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('network-security');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('NetworkSecurity').should('exist');
    cy.url().should('match', networkSecurityPageUrlPattern);
  });

  describe('NetworkSecurity page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(networkSecurityPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create NetworkSecurity page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/network-security/new$'));
        cy.getEntityCreateUpdateHeading('NetworkSecurity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', networkSecurityPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/network-securities',
          body: networkSecuritySample,
        }).then(({ body }) => {
          networkSecurity = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/network-securities+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [networkSecurity],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(networkSecurityPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details NetworkSecurity page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('networkSecurity');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', networkSecurityPageUrlPattern);
      });

      it('edit button click should load edit NetworkSecurity page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('NetworkSecurity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', networkSecurityPageUrlPattern);
      });

      it('edit button click should load edit NetworkSecurity page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('NetworkSecurity');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', networkSecurityPageUrlPattern);
      });

      it('last delete button click should delete instance of NetworkSecurity', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('networkSecurity').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', networkSecurityPageUrlPattern);

        networkSecurity = undefined;
      });
    });
  });

  describe('new NetworkSecurity page', () => {
    beforeEach(() => {
      cy.visit(`${networkSecurityPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('NetworkSecurity');
    });

    it('should create an instance of NetworkSecurity', () => {
      cy.get(`[data-cy="alertType"]`).type('considérable');
      cy.get(`[data-cy="alertType"]`).should('have.value', 'considérable');

      cy.get(`[data-cy="description"]`).type('un peu');
      cy.get(`[data-cy="description"]`).should('have.value', 'un peu');

      cy.get(`[data-cy="timestamp"]`).type('2023-11-09T07:36');
      cy.get(`[data-cy="timestamp"]`).blur();
      cy.get(`[data-cy="timestamp"]`).should('have.value', '2023-11-09T07:36');

      cy.get(`[data-cy="severity"]`).type('cot cot');
      cy.get(`[data-cy="severity"]`).should('have.value', 'cot cot');

      cy.get(`[data-cy="resolution"]`).type('athlète');
      cy.get(`[data-cy="resolution"]`).should('have.value', 'athlète');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        networkSecurity = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', networkSecurityPageUrlPattern);
    });
  });
});
