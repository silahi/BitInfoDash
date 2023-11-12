import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMarketTrends } from '../market-trends.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../market-trends.test-samples';

import { MarketTrendsService, RestMarketTrends } from './market-trends.service';

const requireRestSample: RestMarketTrends = {
  ...sampleWithRequiredData,
  timestamp: sampleWithRequiredData.timestamp?.toJSON(),
};

describe('MarketTrends Service', () => {
  let service: MarketTrendsService;
  let httpMock: HttpTestingController;
  let expectedResult: IMarketTrends | IMarketTrends[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MarketTrendsService);
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

    it('should create a MarketTrends', () => {
      const marketTrends = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(marketTrends).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MarketTrends', () => {
      const marketTrends = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(marketTrends).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MarketTrends', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MarketTrends', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MarketTrends', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMarketTrendsToCollectionIfMissing', () => {
      it('should add a MarketTrends to an empty array', () => {
        const marketTrends: IMarketTrends = sampleWithRequiredData;
        expectedResult = service.addMarketTrendsToCollectionIfMissing([], marketTrends);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(marketTrends);
      });

      it('should not add a MarketTrends to an array that contains it', () => {
        const marketTrends: IMarketTrends = sampleWithRequiredData;
        const marketTrendsCollection: IMarketTrends[] = [
          {
            ...marketTrends,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMarketTrendsToCollectionIfMissing(marketTrendsCollection, marketTrends);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MarketTrends to an array that doesn't contain it", () => {
        const marketTrends: IMarketTrends = sampleWithRequiredData;
        const marketTrendsCollection: IMarketTrends[] = [sampleWithPartialData];
        expectedResult = service.addMarketTrendsToCollectionIfMissing(marketTrendsCollection, marketTrends);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(marketTrends);
      });

      it('should add only unique MarketTrends to an array', () => {
        const marketTrendsArray: IMarketTrends[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const marketTrendsCollection: IMarketTrends[] = [sampleWithRequiredData];
        expectedResult = service.addMarketTrendsToCollectionIfMissing(marketTrendsCollection, ...marketTrendsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const marketTrends: IMarketTrends = sampleWithRequiredData;
        const marketTrends2: IMarketTrends = sampleWithPartialData;
        expectedResult = service.addMarketTrendsToCollectionIfMissing([], marketTrends, marketTrends2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(marketTrends);
        expect(expectedResult).toContain(marketTrends2);
      });

      it('should accept null and undefined values', () => {
        const marketTrends: IMarketTrends = sampleWithRequiredData;
        expectedResult = service.addMarketTrendsToCollectionIfMissing([], null, marketTrends, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(marketTrends);
      });

      it('should return initial array if no MarketTrends is added', () => {
        const marketTrendsCollection: IMarketTrends[] = [sampleWithRequiredData];
        expectedResult = service.addMarketTrendsToCollectionIfMissing(marketTrendsCollection, undefined, null);
        expect(expectedResult).toEqual(marketTrendsCollection);
      });
    });

    describe('compareMarketTrends', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMarketTrends(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMarketTrends(entity1, entity2);
        const compareResult2 = service.compareMarketTrends(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMarketTrends(entity1, entity2);
        const compareResult2 = service.compareMarketTrends(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMarketTrends(entity1, entity2);
        const compareResult2 = service.compareMarketTrends(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
