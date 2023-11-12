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

describe('BitcoinOverview e2e test', () => {
  const bitcoinOverviewPageUrl = '/bitcoin-overview';
  const bitcoinOverviewPageUrlPattern = new RegExp('/bitcoin-overview(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const bitcoinOverviewSample = {};

  let bitcoinOverview;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/bitcoin-overviews+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/bitcoin-overviews').as('postEntityRequest');
    cy.intercept('DELETE', '/api/bitcoin-overviews/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (bitcoinOverview) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/bitcoin-overviews/${bitcoinOverview.id}`,
      }).then(() => {
        bitcoinOverview = undefined;
      });
    }
  });

  it('BitcoinOverviews menu should load BitcoinOverviews page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('bitcoin-overview');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('BitcoinOverview').should('exist');
    cy.url().should('match', bitcoinOverviewPageUrlPattern);
  });

  describe('BitcoinOverview page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(bitcoinOverviewPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create BitcoinOverview page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/bitcoin-overview/new$'));
        cy.getEntityCreateUpdateHeading('BitcoinOverview');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bitcoinOverviewPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/bitcoin-overviews',
          body: bitcoinOverviewSample,
        }).then(({ body }) => {
          bitcoinOverview = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/bitcoin-overviews+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [bitcoinOverview],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(bitcoinOverviewPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details BitcoinOverview page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('bitcoinOverview');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bitcoinOverviewPageUrlPattern);
      });

      it('edit button click should load edit BitcoinOverview page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BitcoinOverview');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bitcoinOverviewPageUrlPattern);
      });

      it('edit button click should load edit BitcoinOverview page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BitcoinOverview');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bitcoinOverviewPageUrlPattern);
      });

      it('last delete button click should delete instance of BitcoinOverview', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('bitcoinOverview').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bitcoinOverviewPageUrlPattern);

        bitcoinOverview = undefined;
      });
    });
  });

  describe('new BitcoinOverview page', () => {
    beforeEach(() => {
      cy.visit(`${bitcoinOverviewPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('BitcoinOverview');
    });

    it('should create an instance of BitcoinOverview', () => {
      cy.get(`[data-cy="bitcoinPrice"]`).type('15170');
      cy.get(`[data-cy="bitcoinPrice"]`).should('have.value', '15170');

      cy.get(`[data-cy="marketCap"]`).type('10782.12');
      cy.get(`[data-cy="marketCap"]`).should('have.value', '10782.12');

      cy.get(`[data-cy="exchangeVolume"]`).type('12794.23');
      cy.get(`[data-cy="exchangeVolume"]`).should('have.value', '12794.23');

      cy.get(`[data-cy="recentVariation"]`).type('11103.58');
      cy.get(`[data-cy="recentVariation"]`).should('have.value', '11103.58');

      cy.get(`[data-cy="timestamp"]`).type('2023-11-10T00:49');
      cy.get(`[data-cy="timestamp"]`).blur();
      cy.get(`[data-cy="timestamp"]`).should('have.value', '2023-11-10T00:49');

      cy.get(`[data-cy="currency"]`).type('après allonger toutefois');
      cy.get(`[data-cy="currency"]`).should('have.value', 'après allonger toutefois');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        bitcoinOverview = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', bitcoinOverviewPageUrlPattern);
    });
  });
});
