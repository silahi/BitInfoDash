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

describe('OHLCVT15m e2e test', () => {
  const oHLCVT15mPageUrl = '/ohlcvt-15-m';
  const oHLCVT15mPageUrlPattern = new RegExp('/ohlcvt-15-m(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const oHLCVT15mSample = {};

  let oHLCVT15m;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ohlcvt-15-ms+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ohlcvt-15-ms').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ohlcvt-15-ms/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (oHLCVT15m) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ohlcvt-15-ms/${oHLCVT15m.id}`,
      }).then(() => {
        oHLCVT15m = undefined;
      });
    }
  });

  it('OHLCVT15ms menu should load OHLCVT15ms page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ohlcvt-15-m');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OHLCVT15m').should('exist');
    cy.url().should('match', oHLCVT15mPageUrlPattern);
  });

  describe('OHLCVT15m page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(oHLCVT15mPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create OHLCVT15m page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/ohlcvt-15-m/new$'));
        cy.getEntityCreateUpdateHeading('OHLCVT15m');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT15mPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ohlcvt-15-ms',
          body: oHLCVT15mSample,
        }).then(({ body }) => {
          oHLCVT15m = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ohlcvt-15-ms+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [oHLCVT15m],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(oHLCVT15mPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details OHLCVT15m page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('oHLCVT15m');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT15mPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT15m page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT15m');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT15mPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT15m page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT15m');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT15mPageUrlPattern);
      });

      it('last delete button click should delete instance of OHLCVT15m', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('oHLCVT15m').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT15mPageUrlPattern);

        oHLCVT15m = undefined;
      });
    });
  });

  describe('new OHLCVT15m page', () => {
    beforeEach(() => {
      cy.visit(`${oHLCVT15mPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('OHLCVT15m');
    });

    it('should create an instance of OHLCVT15m', () => {
      cy.get(`[data-cy="timestamp"]`).type('2023-11-09T06:34');
      cy.get(`[data-cy="timestamp"]`).blur();
      cy.get(`[data-cy="timestamp"]`).should('have.value', '2023-11-09T06:34');

      cy.get(`[data-cy="open"]`).type('10433.32');
      cy.get(`[data-cy="open"]`).should('have.value', '10433.32');

      cy.get(`[data-cy="high"]`).type('7762.02');
      cy.get(`[data-cy="high"]`).should('have.value', '7762.02');

      cy.get(`[data-cy="low"]`).type('31499.72');
      cy.get(`[data-cy="low"]`).should('have.value', '31499.72');

      cy.get(`[data-cy="close"]`).type('28342.22');
      cy.get(`[data-cy="close"]`).should('have.value', '28342.22');

      cy.get(`[data-cy="volume"]`).type('26123');
      cy.get(`[data-cy="volume"]`).should('have.value', '26123');

      cy.get(`[data-cy="trades"]`).type('21575');
      cy.get(`[data-cy="trades"]`).should('have.value', '21575');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        oHLCVT15m = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', oHLCVT15mPageUrlPattern);
    });
  });
});
