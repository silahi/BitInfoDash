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

describe('BlockchainAnalytics e2e test', () => {
  const blockchainAnalyticsPageUrl = '/blockchain-analytics';
  const blockchainAnalyticsPageUrlPattern = new RegExp('/blockchain-analytics(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const blockchainAnalyticsSample = {};

  let blockchainAnalytics;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/blockchain-analytics+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/blockchain-analytics').as('postEntityRequest');
    cy.intercept('DELETE', '/api/blockchain-analytics/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (blockchainAnalytics) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/blockchain-analytics/${blockchainAnalytics.id}`,
      }).then(() => {
        blockchainAnalytics = undefined;
      });
    }
  });

  it('BlockchainAnalytics menu should load BlockchainAnalytics page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('blockchain-analytics');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('BlockchainAnalytics').should('exist');
    cy.url().should('match', blockchainAnalyticsPageUrlPattern);
  });

  describe('BlockchainAnalytics page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(blockchainAnalyticsPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create BlockchainAnalytics page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/blockchain-analytics/new$'));
        cy.getEntityCreateUpdateHeading('BlockchainAnalytics');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', blockchainAnalyticsPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/blockchain-analytics',
          body: blockchainAnalyticsSample,
        }).then(({ body }) => {
          blockchainAnalytics = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/blockchain-analytics+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [blockchainAnalytics],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(blockchainAnalyticsPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details BlockchainAnalytics page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('blockchainAnalytics');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', blockchainAnalyticsPageUrlPattern);
      });

      it('edit button click should load edit BlockchainAnalytics page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BlockchainAnalytics');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', blockchainAnalyticsPageUrlPattern);
      });

      it('edit button click should load edit BlockchainAnalytics page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BlockchainAnalytics');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', blockchainAnalyticsPageUrlPattern);
      });

      it('last delete button click should delete instance of BlockchainAnalytics', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('blockchainAnalytics').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', blockchainAnalyticsPageUrlPattern);

        blockchainAnalytics = undefined;
      });
    });
  });

  describe('new BlockchainAnalytics page', () => {
    beforeEach(() => {
      cy.visit(`${blockchainAnalyticsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('BlockchainAnalytics');
    });

    it('should create an instance of BlockchainAnalytics', () => {
      cy.get(`[data-cy="transactionCount"]`).type('14589');
      cy.get(`[data-cy="transactionCount"]`).should('have.value', '14589');

      cy.get(`[data-cy="averageTransactionFee"]`).type('22170.4');
      cy.get(`[data-cy="averageTransactionFee"]`).should('have.value', '22170.4');

      cy.get(`[data-cy="hashrateDistribution"]`).type('gigantesque');
      cy.get(`[data-cy="hashrateDistribution"]`).should('have.value', 'gigantesque');

      cy.get(`[data-cy="timestamp"]`).type('2023-11-09T22:48');
      cy.get(`[data-cy="timestamp"]`).blur();
      cy.get(`[data-cy="timestamp"]`).should('have.value', '2023-11-09T22:48');

      cy.get(`[data-cy="difficulty"]`).type('637');
      cy.get(`[data-cy="difficulty"]`).should('have.value', '637');

      cy.get(`[data-cy="networkHashrate"]`).type('18639.93');
      cy.get(`[data-cy="networkHashrate"]`).should('have.value', '18639.93');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        blockchainAnalytics = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', blockchainAnalyticsPageUrlPattern);
    });
  });
});
