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

describe('BitcoinAddress e2e test', () => {
  const bitcoinAddressPageUrl = '/bitcoin-address';
  const bitcoinAddressPageUrlPattern = new RegExp('/bitcoin-address(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const bitcoinAddressSample = {};

  let bitcoinAddress;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/bitcoin-addresses+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/bitcoin-addresses').as('postEntityRequest');
    cy.intercept('DELETE', '/api/bitcoin-addresses/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (bitcoinAddress) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/bitcoin-addresses/${bitcoinAddress.id}`,
      }).then(() => {
        bitcoinAddress = undefined;
      });
    }
  });

  it('BitcoinAddresses menu should load BitcoinAddresses page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('bitcoin-address');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('BitcoinAddress').should('exist');
    cy.url().should('match', bitcoinAddressPageUrlPattern);
  });

  describe('BitcoinAddress page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(bitcoinAddressPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create BitcoinAddress page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/bitcoin-address/new$'));
        cy.getEntityCreateUpdateHeading('BitcoinAddress');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bitcoinAddressPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/bitcoin-addresses',
          body: bitcoinAddressSample,
        }).then(({ body }) => {
          bitcoinAddress = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/bitcoin-addresses+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [bitcoinAddress],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(bitcoinAddressPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details BitcoinAddress page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('bitcoinAddress');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bitcoinAddressPageUrlPattern);
      });

      it('edit button click should load edit BitcoinAddress page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BitcoinAddress');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bitcoinAddressPageUrlPattern);
      });

      it('edit button click should load edit BitcoinAddress page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BitcoinAddress');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bitcoinAddressPageUrlPattern);
      });

      it('last delete button click should delete instance of BitcoinAddress', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('bitcoinAddress').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bitcoinAddressPageUrlPattern);

        bitcoinAddress = undefined;
      });
    });
  });

  describe('new BitcoinAddress page', () => {
    beforeEach(() => {
      cy.visit(`${bitcoinAddressPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('BitcoinAddress');
    });

    it('should create an instance of BitcoinAddress', () => {
      cy.get(`[data-cy="address"]`).type('trop blablabla tendre');
      cy.get(`[data-cy="address"]`).should('have.value', 'trop blablabla tendre');

      cy.get(`[data-cy="balance"]`).type('4793.5');
      cy.get(`[data-cy="balance"]`).should('have.value', '4793.5');

      cy.get(`[data-cy="label"]`).type('guide présidence');
      cy.get(`[data-cy="label"]`).should('have.value', 'guide présidence');

      cy.get(`[data-cy="sent"]`).type('3348.16');
      cy.get(`[data-cy="sent"]`).should('have.value', '3348.16');

      cy.get(`[data-cy="received"]`).type('3515.99');
      cy.get(`[data-cy="received"]`).should('have.value', '3515.99');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        bitcoinAddress = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', bitcoinAddressPageUrlPattern);
    });
  });
});
