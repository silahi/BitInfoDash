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

describe('MarketTrends e2e test', () => {
  const marketTrendsPageUrl = '/market-trends';
  const marketTrendsPageUrlPattern = new RegExp('/market-trends(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const marketTrendsSample = {};

  let marketTrends;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/market-trends+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/market-trends').as('postEntityRequest');
    cy.intercept('DELETE', '/api/market-trends/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (marketTrends) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/market-trends/${marketTrends.id}`,
      }).then(() => {
        marketTrends = undefined;
      });
    }
  });

  it('MarketTrends menu should load MarketTrends page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('market-trends');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('MarketTrends').should('exist');
    cy.url().should('match', marketTrendsPageUrlPattern);
  });

  describe('MarketTrends page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(marketTrendsPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create MarketTrends page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/market-trends/new$'));
        cy.getEntityCreateUpdateHeading('MarketTrends');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', marketTrendsPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/market-trends',
          body: marketTrendsSample,
        }).then(({ body }) => {
          marketTrends = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/market-trends+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [marketTrends],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(marketTrendsPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details MarketTrends page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('marketTrends');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', marketTrendsPageUrlPattern);
      });

      it('edit button click should load edit MarketTrends page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('MarketTrends');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', marketTrendsPageUrlPattern);
      });

      it('edit button click should load edit MarketTrends page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('MarketTrends');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', marketTrendsPageUrlPattern);
      });

      it('last delete button click should delete instance of MarketTrends', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('marketTrends').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', marketTrendsPageUrlPattern);

        marketTrends = undefined;
      });
    });
  });

  describe('new MarketTrends page', () => {
    beforeEach(() => {
      cy.visit(`${marketTrendsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('MarketTrends');
    });

    it('should create an instance of MarketTrends', () => {
      cy.get(`[data-cy="trendName"]`).type('insipide hi aventurer');
      cy.get(`[data-cy="trendName"]`).should('have.value', 'insipide hi aventurer');

      cy.get(`[data-cy="indicatorValue"]`).type('16179.91');
      cy.get(`[data-cy="indicatorValue"]`).should('have.value', '16179.91');

      cy.get(`[data-cy="timestamp"]`).type('2023-11-09T14:11');
      cy.get(`[data-cy="timestamp"]`).blur();
      cy.get(`[data-cy="timestamp"]`).should('have.value', '2023-11-09T14:11');

      cy.get(`[data-cy="trendType"]`).type('gens détacher jamais');
      cy.get(`[data-cy="trendType"]`).should('have.value', 'gens détacher jamais');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        marketTrends = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', marketTrendsPageUrlPattern);
    });
  });
});
