import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOHLCVT15m } from '../ohlcvt-15-m.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ohlcvt-15-m.test-samples';

import { OHLCVT15mService, RestOHLCVT15m } from './ohlcvt-15-m.service';

const requireRestSample: RestOHLCVT15m = {
  ...sampleWithRequiredData,
  timestamp: sampleWithRequiredData.timestamp?.toJSON(),
};

describe('OHLCVT15m Service', () => {
  let service: OHLCVT15mService;
  let httpMock: HttpTestingController;
  let expectedResult: IOHLCVT15m | IOHLCVT15m[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OHLCVT15mService);
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

    it('should create a OHLCVT15m', () => {
      const oHLCVT15m = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(oHLCVT15m).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OHLCVT15m', () => {
      const oHLCVT15m = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(oHLCVT15m).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OHLCVT15m', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OHLCVT15m', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OHLCVT15m', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOHLCVT15mToCollectionIfMissing', () => {
      it('should add a OHLCVT15m to an empty array', () => {
        const oHLCVT15m: IOHLCVT15m = sampleWithRequiredData;
        expectedResult = service.addOHLCVT15mToCollectionIfMissing([], oHLCVT15m);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT15m);
      });

      it('should not add a OHLCVT15m to an array that contains it', () => {
        const oHLCVT15m: IOHLCVT15m = sampleWithRequiredData;
        const oHLCVT15mCollection: IOHLCVT15m[] = [
          {
            ...oHLCVT15m,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOHLCVT15mToCollectionIfMissing(oHLCVT15mCollection, oHLCVT15m);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OHLCVT15m to an array that doesn't contain it", () => {
        const oHLCVT15m: IOHLCVT15m = sampleWithRequiredData;
        const oHLCVT15mCollection: IOHLCVT15m[] = [sampleWithPartialData];
        expectedResult = service.addOHLCVT15mToCollectionIfMissing(oHLCVT15mCollection, oHLCVT15m);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT15m);
      });

      it('should add only unique OHLCVT15m to an array', () => {
        const oHLCVT15mArray: IOHLCVT15m[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const oHLCVT15mCollection: IOHLCVT15m[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT15mToCollectionIfMissing(oHLCVT15mCollection, ...oHLCVT15mArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const oHLCVT15m: IOHLCVT15m = sampleWithRequiredData;
        const oHLCVT15m2: IOHLCVT15m = sampleWithPartialData;
        expectedResult = service.addOHLCVT15mToCollectionIfMissing([], oHLCVT15m, oHLCVT15m2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT15m);
        expect(expectedResult).toContain(oHLCVT15m2);
      });

      it('should accept null and undefined values', () => {
        const oHLCVT15m: IOHLCVT15m = sampleWithRequiredData;
        expectedResult = service.addOHLCVT15mToCollectionIfMissing([], null, oHLCVT15m, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT15m);
      });

      it('should return initial array if no OHLCVT15m is added', () => {
        const oHLCVT15mCollection: IOHLCVT15m[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT15mToCollectionIfMissing(oHLCVT15mCollection, undefined, null);
        expect(expectedResult).toEqual(oHLCVT15mCollection);
      });
    });

    describe('compareOHLCVT15m', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOHLCVT15m(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOHLCVT15m(entity1, entity2);
        const compareResult2 = service.compareOHLCVT15m(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOHLCVT15m(entity1, entity2);
        const compareResult2 = service.compareOHLCVT15m(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOHLCVT15m(entity1, entity2);
        const compareResult2 = service.compareOHLCVT15m(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
