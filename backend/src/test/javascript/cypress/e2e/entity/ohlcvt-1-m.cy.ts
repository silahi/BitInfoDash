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

describe('OHLCVT1m e2e test', () => {
  const oHLCVT1mPageUrl = '/ohlcvt-1-m';
  const oHLCVT1mPageUrlPattern = new RegExp('/ohlcvt-1-m(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const oHLCVT1mSample = {};

  let oHLCVT1m;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ohlcvt-1-ms+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ohlcvt-1-ms').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ohlcvt-1-ms/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (oHLCVT1m) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ohlcvt-1-ms/${oHLCVT1m.id}`,
      }).then(() => {
        oHLCVT1m = undefined;
      });
    }
  });

  it('OHLCVT1ms menu should load OHLCVT1ms page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ohlcvt-1-m');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OHLCVT1m').should('exist');
    cy.url().should('match', oHLCVT1mPageUrlPattern);
  });

  describe('OHLCVT1m page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(oHLCVT1mPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create OHLCVT1m page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/ohlcvt-1-m/new$'));
        cy.getEntityCreateUpdateHeading('OHLCVT1m');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1mPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ohlcvt-1-ms',
          body: oHLCVT1mSample,
        }).then(({ body }) => {
          oHLCVT1m = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ohlcvt-1-ms+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [oHLCVT1m],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(oHLCVT1mPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details OHLCVT1m page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('oHLCVT1m');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1mPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT1m page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT1m');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1mPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT1m page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT1m');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1mPageUrlPattern);
      });

      it('last delete button click should delete instance of OHLCVT1m', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('oHLCVT1m').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1mPageUrlPattern);

        oHLCVT1m = undefined;
      });
    });
  });

  describe('new OHLCVT1m page', () => {
    beforeEach(() => {
      cy.visit(`${oHLCVT1mPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('OHLCVT1m');
    });

    it('should create an instance of OHLCVT1m', () => {
      cy.get(`[data-cy="timestamp"]`).type('2023-11-10T06:08');
      cy.get(`[data-cy="timestamp"]`).blur();
      cy.get(`[data-cy="timestamp"]`).should('have.value', '2023-11-10T06:08');

      cy.get(`[data-cy="open"]`).type('20546.73');
      cy.get(`[data-cy="open"]`).should('have.value', '20546.73');

      cy.get(`[data-cy="high"]`).type('28862.33');
      cy.get(`[data-cy="high"]`).should('have.value', '28862.33');

      cy.get(`[data-cy="low"]`).type('5936.92');
      cy.get(`[data-cy="low"]`).should('have.value', '5936.92');

      cy.get(`[data-cy="close"]`).type('17470.28');
      cy.get(`[data-cy="close"]`).should('have.value', '17470.28');

      cy.get(`[data-cy="volume"]`).type('30485');
      cy.get(`[data-cy="volume"]`).should('have.value', '30485');

      cy.get(`[data-cy="trades"]`).type('28338');
      cy.get(`[data-cy="trades"]`).should('have.value', '28338');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        oHLCVT1m = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', oHLCVT1mPageUrlPattern);
    });
  });
});
