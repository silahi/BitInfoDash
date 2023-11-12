import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITransactions } from '../transactions.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../transactions.test-samples';

import { TransactionsService, RestTransactions } from './transactions.service';

const requireRestSample: RestTransactions = {
  ...sampleWithRequiredData,
  transactionDate: sampleWithRequiredData.transactionDate?.toJSON(),
};

describe('Transactions Service', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;
  let expectedResult: ITransactions | ITransactions[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Transactions', () => {
      const transactions = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(transactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Transactions', () => {
      const transactions = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(transactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Transactions', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Transactions', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Transactions', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTransactionsToCollectionIfMissing', () => {
      it('should add a Transactions to an empty array', () => {
        const transactions: ITransactions = sampleWithRequiredData;
        expectedResult = service.addTransactionsToCollectionIfMissing([], transactions);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(transactions);
      });

      it('should not add a Transactions to an array that contains it', () => {
        const transactions: ITransactions = sampleWithRequiredData;
        const transactionsCollection: ITransactions[] = [
          {
            ...transactions,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTransactionsToCollectionIfMissing(transactionsCollection, transactions);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Transactions to an array that doesn't contain it", () => {
        const transactions: ITransactions = sampleWithRequiredData;
        const transactionsCollection: ITransactions[] = [sampleWithPartialData];
        expectedResult = service.addTransactionsToCollectionIfMissing(transactionsCollection, transactions);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(transactions);
      });

      it('should add only unique Transactions to an array', () => {
        const transactionsArray: ITransactions[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const transactionsCollection: ITransactions[] = [sampleWithRequiredData];
        expectedResult = service.addTransactionsToCollectionIfMissing(transactionsCollection, ...transactionsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const transactions: ITransactions = sampleWithRequiredData;
        const transactions2: ITransactions = sampleWithPartialData;
        expectedResult = service.addTransactionsToCollectionIfMissing([], transactions, transactions2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(transactions);
        expect(expectedResult).toContain(transactions2);
      });

      it('should accept null and undefined values', () => {
        const transactions: ITransactions = sampleWithRequiredData;
        expectedResult = service.addTransactionsToCollectionIfMissing([], null, transactions, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(transactions);
      });

      it('should return initial array if no Transactions is added', () => {
        const transactionsCollection: ITransactions[] = [sampleWithRequiredData];
        expectedResult = service.addTransactionsToCollectionIfMissing(transactionsCollection, undefined, null);
        expect(expectedResult).toEqual(transactionsCollection);
      });
    });

    describe('compareTransactions', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTransactions(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTransactions(entity1, entity2);
        const compareResult2 = service.compareTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTransactions(entity1, entity2);
        const compareResult2 = service.compareTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTransactions(entity1, entity2);
        const compareResult2 = service.compareTransactions(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
