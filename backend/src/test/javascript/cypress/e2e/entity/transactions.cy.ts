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

describe('Transactions e2e test', () => {
  const transactionsPageUrl = '/transactions';
  const transactionsPageUrlPattern = new RegExp('/transactions(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const transactionsSample = {};

  let transactions;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/transactions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/transactions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/transactions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (transactions) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/transactions/${transactions.id}`,
      }).then(() => {
        transactions = undefined;
      });
    }
  });

  it('Transactions menu should load Transactions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('transactions');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Transactions').should('exist');
    cy.url().should('match', transactionsPageUrlPattern);
  });

  describe('Transactions page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(transactionsPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Transactions page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/transactions/new$'));
        cy.getEntityCreateUpdateHeading('Transactions');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionsPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/transactions',
          body: transactionsSample,
        }).then(({ body }) => {
          transactions = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/transactions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [transactions],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(transactionsPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Transactions page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('transactions');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionsPageUrlPattern);
      });

      it('edit button click should load edit Transactions page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Transactions');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionsPageUrlPattern);
      });

      it('edit button click should load edit Transactions page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Transactions');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionsPageUrlPattern);
      });

      it('last delete button click should delete instance of Transactions', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('transactions').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', transactionsPageUrlPattern);

        transactions = undefined;
      });
    });
  });

  describe('new Transactions page', () => {
    beforeEach(() => {
      cy.visit(`${transactionsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Transactions');
    });

    it('should create an instance of Transactions', () => {
      cy.get(`[data-cy="amount"]`).type('9422.5');
      cy.get(`[data-cy="amount"]`).should('have.value', '9422.5');

      cy.get(`[data-cy="transactionDate"]`).type('2023-11-09T18:59');
      cy.get(`[data-cy="transactionDate"]`).blur();
      cy.get(`[data-cy="transactionDate"]`).should('have.value', '2023-11-09T18:59');

      cy.get(`[data-cy="senderAddress"]`).type('par si');
      cy.get(`[data-cy="senderAddress"]`).should('have.value', 'par si');

      cy.get(`[data-cy="recipientAddress"]`).type('énergique tant que vlan');
      cy.get(`[data-cy="recipientAddress"]`).should('have.value', 'énergique tant que vlan');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        transactions = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', transactionsPageUrlPattern);
    });
  });
});
