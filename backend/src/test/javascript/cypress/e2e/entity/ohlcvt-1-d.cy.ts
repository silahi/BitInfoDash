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

describe('OHLCVT1d e2e test', () => {
  const oHLCVT1dPageUrl = '/ohlcvt-1-d';
  const oHLCVT1dPageUrlPattern = new RegExp('/ohlcvt-1-d(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const oHLCVT1dSample = {};

  let oHLCVT1d;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ohlcvt-1-ds+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ohlcvt-1-ds').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ohlcvt-1-ds/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (oHLCVT1d) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ohlcvt-1-ds/${oHLCVT1d.id}`,
      }).then(() => {
        oHLCVT1d = undefined;
      });
    }
  });

  it('OHLCVT1ds menu should load OHLCVT1ds page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ohlcvt-1-d');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OHLCVT1d').should('exist');
    cy.url().should('match', oHLCVT1dPageUrlPattern);
  });

  describe('OHLCVT1d page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(oHLCVT1dPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create OHLCVT1d page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/ohlcvt-1-d/new$'));
        cy.getEntityCreateUpdateHeading('OHLCVT1d');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1dPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ohlcvt-1-ds',
          body: oHLCVT1dSample,
        }).then(({ body }) => {
          oHLCVT1d = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ohlcvt-1-ds+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [oHLCVT1d],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(oHLCVT1dPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details OHLCVT1d page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('oHLCVT1d');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1dPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT1d page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT1d');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1dPageUrlPattern);
      });

      it('edit button click should load edit OHLCVT1d page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OHLCVT1d');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1dPageUrlPattern);
      });

      it('last delete button click should delete instance of OHLCVT1d', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('oHLCVT1d').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', oHLCVT1dPageUrlPattern);

        oHLCVT1d = undefined;
      });
    });
  });

  describe('new OHLCVT1d page', () => {
    beforeEach(() => {
      cy.visit(`${oHLCVT1dPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('OHLCVT1d');
    });

    it('should create an instance of OHLCVT1d', () => {
      cy.get(`[data-cy="timestamp"]`).type('2023-11-09T14:24');
      cy.get(`[data-cy="timestamp"]`).blur();
      cy.get(`[data-cy="timestamp"]`).should('have.value', '2023-11-09T14:24');

      cy.get(`[data-cy="open"]`).type('1036.02');
      cy.get(`[data-cy="open"]`).should('have.value', '1036.02');

      cy.get(`[data-cy="high"]`).type('20524.01');
      cy.get(`[data-cy="high"]`).should('have.value', '20524.01');

      cy.get(`[data-cy="low"]`).type('4475.44');
      cy.get(`[data-cy="low"]`).should('have.value', '4475.44');

      cy.get(`[data-cy="close"]`).type('18954.9');
      cy.get(`[data-cy="close"]`).should('have.value', '18954.9');

      cy.get(`[data-cy="volume"]`).type('26846');
      cy.get(`[data-cy="volume"]`).should('have.value', '26846');

      cy.get(`[data-cy="trades"]`).type('30405');
      cy.get(`[data-cy="trades"]`).should('have.value', '30405');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        oHLCVT1d = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', oHLCVT1dPageUrlPattern);
    });
  });
});
