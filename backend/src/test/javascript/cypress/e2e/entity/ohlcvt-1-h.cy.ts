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

describe('OHLCVT1h e2e test', () => {
  const oHLCVT1hPageUrl = '/ohlcvt-1-h';
  const oHLCVT1hPageUrlPattern = new RegExp('/ohlcvt-1-h(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const oHLCVT1hSample = {};

  let oHLCVT1h;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ohlcvt-1-hs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ohlcvt-1-hs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ohlcvt-1-hs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (oHLCVT1h) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ohlcvt-1-hs/${oHLCVT1h.id}`,
      }).then(() => {
        oHLCVT1h = undefined;
      });
    }
  });

  it('OHLCVT1hs menu should load OHLCVT1hs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ohlcvt-1-h');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OHLCVT1h').should('exist');
    cy.url().should('match', oHLCVT1hPageUrlPattern);
  });

  describe('OHLCVT1h page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(oHLCVT1hPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create OHLCVT1h page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/ohlcvt-1-h/new$'));
        cy.getEntityCreateUpdateHeading('OHLCVT1h');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1hPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ohlcvt-1-hs',
          body: oHLCVT1hSample,
        }).then(({ body }) => {
          oHLCVT1h = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ohlcvt-1-hs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [oHLCVT1h],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(oHLCVT1hPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details OHLCVT1h page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('oHLCVT1h');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1hPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT1h page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT1h');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1hPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT1h page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT1h');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1hPageUrlPattern);
      });

      it('last delete button click should delete instance of OHLCVT1h', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('oHLCVT1h').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1hPageUrlPattern);

        oHLCVT1h = undefined;
      });
    });
  });

  describe('new OHLCVT1h page', () => {
    beforeEach(() => {
      cy.visit(`${oHLCVT1hPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('OHLCVT1h');
    });

    it('should create an instance of OHLCVT1h', () => {
      cy.get(`[data-cy="timestamp"]`).type('2023-11-09T21:11');
      cy.get(`[data-cy="timestamp"]`).blur();
      cy.get(`[data-cy="timestamp"]`).should('have.value', '2023-11-09T21:11');

      cy.get(`[data-cy="open"]`).type('11091.84');
      cy.get(`[data-cy="open"]`).should('have.value', '11091.84');

      cy.get(`[data-cy="high"]`).type('27021.5');
      cy.get(`[data-cy="high"]`).should('have.value', '27021.5');

      cy.get(`[data-cy="low"]`).type('8824.24');
      cy.get(`[data-cy="low"]`).should('have.value', '8824.24');

      cy.get(`[data-cy="close"]`).type('1446.96');
      cy.get(`[data-cy="close"]`).should('have.value', '1446.96');

      cy.get(`[data-cy="volume"]`).type('29668');
      cy.get(`[data-cy="volume"]`).should('have.value', '29668');

      cy.get(`[data-cy="trades"]`).type('25051');
      cy.get(`[data-cy="trades"]`).should('have.value', '25051');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        oHLCVT1h = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', oHLCVT1hPageUrlPattern);
    });
  });
});
