import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBitcoinOverview } from '../bitcoin-overview.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../bitcoin-overview.test-samples';

import { BitcoinOverviewService, RestBitcoinOverview } from './bitcoin-overview.service';

const requireRestSample: RestBitcoinOverview = {
  ...sampleWithRequiredData,
  timestamp: sampleWithRequiredData.timestamp?.toJSON(),
};

describe('BitcoinOverview Service', () => {
  let service: BitcoinOverviewService;
  let httpMock: HttpTestingController;
  let expectedResult: IBitcoinOverview | IBitcoinOverview[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BitcoinOverviewService);
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

    it('should create a BitcoinOverview', () => {
      const bitcoinOverview = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(bitcoinOverview).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BitcoinOverview', () => {
      const bitcoinOverview = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(bitcoinOverview).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BitcoinOverview', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BitcoinOverview', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BitcoinOverview', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBitcoinOverviewToCollectionIfMissing', () => {
      it('should add a BitcoinOverview to an empty array', () => {
        const bitcoinOverview: IBitcoinOverview = sampleWithRequiredData;
        expectedResult = service.addBitcoinOverviewToCollectionIfMissing([], bitcoinOverview);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bitcoinOverview);
      });

      it('should not add a BitcoinOverview to an array that contains it', () => {
        const bitcoinOverview: IBitcoinOverview = sampleWithRequiredData;
        const bitcoinOverviewCollection: IBitcoinOverview[] = [
          {
            ...bitcoinOverview,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBitcoinOverviewToCollectionIfMissing(bitcoinOverviewCollection, bitcoinOverview);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BitcoinOverview to an array that doesn't contain it", () => {
        const bitcoinOverview: IBitcoinOverview = sampleWithRequiredData;
        const bitcoinOverviewCollection: IBitcoinOverview[] = [sampleWithPartialData];
        expectedResult = service.addBitcoinOverviewToCollectionIfMissing(bitcoinOverviewCollection, bitcoinOverview);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bitcoinOverview);
      });

      it('should add only unique BitcoinOverview to an array', () => {
        const bitcoinOverviewArray: IBitcoinOverview[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const bitcoinOverviewCollection: IBitcoinOverview[] = [sampleWithRequiredData];
        expectedResult = service.addBitcoinOverviewToCollectionIfMissing(bitcoinOverviewCollection, ...bitcoinOverviewArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bitcoinOverview: IBitcoinOverview = sampleWithRequiredData;
        const bitcoinOverview2: IBitcoinOverview = sampleWithPartialData;
        expectedResult = service.addBitcoinOverviewToCollectionIfMissing([], bitcoinOverview, bitcoinOverview2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bitcoinOverview);
        expect(expectedResult).toContain(bitcoinOverview2);
      });

      it('should accept null and undefined values', () => {
        const bitcoinOverview: IBitcoinOverview = sampleWithRequiredData;
        expectedResult = service.addBitcoinOverviewToCollectionIfMissing([], null, bitcoinOverview, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bitcoinOverview);
      });

      it('should return initial array if no BitcoinOverview is added', () => {
        const bitcoinOverviewCollection: IBitcoinOverview[] = [sampleWithRequiredData];
        expectedResult = service.addBitcoinOverviewToCollectionIfMissing(bitcoinOverviewCollection, undefined, null);
        expect(expectedResult).toEqual(bitcoinOverviewCollection);
      });
    });

    describe('compareBitcoinOverview', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBitcoinOverview(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBitcoinOverview(entity1, entity2);
        const compareResult2 = service.compareBitcoinOverview(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBitcoinOverview(entity1, entity2);
        const compareResult2 = service.compareBitcoinOverview(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBitcoinOverview(entity1, entity2);
        const compareResult2 = service.compareBitcoinOverview(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
