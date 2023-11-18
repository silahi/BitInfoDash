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

describe('OHLCVT12h e2e test', () => {
  const oHLCVT12hPageUrl = '/ohlcvt-12-h';
  const oHLCVT12hPageUrlPattern = new RegExp('/ohlcvt-12-h(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const oHLCVT12hSample = {};

  let oHLCVT12h;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ohlcvt-12-hs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ohlcvt-12-hs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ohlcvt-12-hs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (oHLCVT12h) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ohlcvt-12-hs/${oHLCVT12h.id}`,
      }).then(() => {
        oHLCVT12h = undefined;
      });
    }
  });

  it('OHLCVT12hs menu should load OHLCVT12hs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ohlcvt-12-h');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OHLCVT12h').should('exist');
    cy.url().should('match', oHLCVT12hPageUrlPattern);
  });

  describe('OHLCVT12h page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(oHLCVT12hPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create OHLCVT12h page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/ohlcvt-12-h/new$'));
        cy.getEntityCreateUpdateHeading('OHLCVT12h');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT12hPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ohlcvt-12-hs',
          body: oHLCVT12hSample,
        }).then(({ body }) => {
          oHLCVT12h = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ohlcvt-12-hs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [oHLCVT12h],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(oHLCVT12hPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details OHLCVT12h page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('oHLCVT12h');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT12hPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT12h page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT12h');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT12hPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT12h page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT12h');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT12hPageUrlPattern);
      });

      it('last delete button click should delete instance of OHLCVT12h', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('oHLCVT12h').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT12hPageUrlPattern);

        oHLCVT12h = undefined;
      });
    });
  });

  describe('new OHLCVT12h page', () => {
    beforeEach(() => {
      cy.visit(`${oHLCVT12hPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('OHLCVT12h');
    });

    it('should create an instance of OHLCVT12h', () => {
      cy.get(`[data-cy="timestamp"]`).type('2023-11-10T04:53');
      cy.get(`[data-cy="timestamp"]`).blur();
      cy.get(`[data-cy="timestamp"]`).should('have.value', '2023-11-10T04:53');

      cy.get(`[data-cy="open"]`).type('5918');
      cy.get(`[data-cy="open"]`).should('have.value', '5918');

      cy.get(`[data-cy="high"]`).type('8110.35');
      cy.get(`[data-cy="high"]`).should('have.value', '8110.35');

      cy.get(`[data-cy="low"]`).type('1080.18');
      cy.get(`[data-cy="low"]`).should('have.value', '1080.18');

      cy.get(`[data-cy="close"]`).type('24998.42');
      cy.get(`[data-cy="close"]`).should('have.value', '24998.42');

      cy.get(`[data-cy="volume"]`).type('12026');
      cy.get(`[data-cy="volume"]`).should('have.value', '12026');

      cy.get(`[data-cy="trades"]`).type('31159');
      cy.get(`[data-cy="trades"]`).should('have.value', '31159');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        oHLCVT12h = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', oHLCVT12hPageUrlPattern);
    });
  });
});
