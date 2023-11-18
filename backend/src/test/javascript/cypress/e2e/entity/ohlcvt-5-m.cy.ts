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

describe('OHLCVT5m e2e test', () => {
  const oHLCVT5mPageUrl = '/ohlcvt-5-m';
  const oHLCVT5mPageUrlPattern = new RegExp('/ohlcvt-5-m(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const oHLCVT5mSample = {};

  let oHLCVT5m;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ohlcvt-5-ms+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ohlcvt-5-ms').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ohlcvt-5-ms/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (oHLCVT5m) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ohlcvt-5-ms/${oHLCVT5m.id}`,
      }).then(() => {
        oHLCVT5m = undefined;
      });
    }
  });

  it('OHLCVT5ms menu should load OHLCVT5ms page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ohlcvt-5-m');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OHLCVT5m').should('exist');
    cy.url().should('match', oHLCVT5mPageUrlPattern);
  });

  describe('OHLCVT5m page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(oHLCVT5mPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create OHLCVT5m page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/ohlcvt-5-m/new$'));
        cy.getEntityCreateUpdateHeading('OHLCVT5m');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT5mPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ohlcvt-5-ms',
          body: oHLCVT5mSample,
        }).then(({ body }) => {
          oHLCVT5m = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ohlcvt-5-ms+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [oHLCVT5m],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(oHLCVT5mPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details OHLCVT5m page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('oHLCVT5m');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT5mPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT5m page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT5m');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT5mPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT5m page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT5m');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT5mPageUrlPattern);
      });

      it('last delete button click should delete instance of OHLCVT5m', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('oHLCVT5m').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT5mPageUrlPattern);

        oHLCVT5m = undefined;
      });
    });
  });

  describe('new OHLCVT5m page', () => {
    beforeEach(() => {
      cy.visit(`${oHLCVT5mPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('OHLCVT5m');
    });

    it('should create an instance of OHLCVT5m', () => {
      cy.get(`[data-cy="timestamp"]`).type('2023-11-09T15:12');
      cy.get(`[data-cy="timestamp"]`).blur();
      cy.get(`[data-cy="timestamp"]`).should('have.value', '2023-11-09T15:12');

      cy.get(`[data-cy="open"]`).type('6941.69');
      cy.get(`[data-cy="open"]`).should('have.value', '6941.69');

      cy.get(`[data-cy="high"]`).type('16357.92');
      cy.get(`[data-cy="high"]`).should('have.value', '16357.92');

      cy.get(`[data-cy="low"]`).type('2366.51');
      cy.get(`[data-cy="low"]`).should('have.value', '2366.51');

      cy.get(`[data-cy="close"]`).type('28401.05');
      cy.get(`[data-cy="close"]`).should('have.value', '28401.05');

      cy.get(`[data-cy="volume"]`).type('27089');
      cy.get(`[data-cy="volume"]`).should('have.value', '27089');

      cy.get(`[data-cy="trades"]`).type('29281');
      cy.get(`[data-cy="trades"]`).should('have.value', '29281');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        oHLCVT5m = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', oHLCVT5mPageUrlPattern);
    });
  });
});
