import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOHLCVT1m } from '../ohlcvt-1-m.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ohlcvt-1-m.test-samples';

import { OHLCVT1mService, RestOHLCVT1m } from './ohlcvt-1-m.service';

const requireRestSample: RestOHLCVT1m = {
  ...sampleWithRequiredData,
  timestamp: sampleWithRequiredData.timestamp?.toJSON(),
};

describe('OHLCVT1m Service', () => {
  let service: OHLCVT1mService;
  let httpMock: HttpTestingController;
  let expectedResult: IOHLCVT1m | IOHLCVT1m[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OHLCVT1mService);
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

    it('should create a OHLCVT1m', () => {
      const oHLCVT1m = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(oHLCVT1m).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OHLCVT1m', () => {
      const oHLCVT1m = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(oHLCVT1m).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OHLCVT1m', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OHLCVT1m', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OHLCVT1m', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOHLCVT1mToCollectionIfMissing', () => {
      it('should add a OHLCVT1m to an empty array', () => {
        const oHLCVT1m: IOHLCVT1m = sampleWithRequiredData;
        expectedResult = service.addOHLCVT1mToCollectionIfMissing([], oHLCVT1m);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT1m);
      });

      it('should not add a OHLCVT1m to an array that contains it', () => {
        const oHLCVT1m: IOHLCVT1m = sampleWithRequiredData;
        const oHLCVT1mCollection: IOHLCVT1m[] = [
          {
            ...oHLCVT1m,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOHLCVT1mToCollectionIfMissing(oHLCVT1mCollection, oHLCVT1m);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OHLCVT1m to an array that doesn't contain it", () => {
        const oHLCVT1m: IOHLCVT1m = sampleWithRequiredData;
        const oHLCVT1mCollection: IOHLCVT1m[] = [sampleWithPartialData];
        expectedResult = service.addOHLCVT1mToCollectionIfMissing(oHLCVT1mCollection, oHLCVT1m);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT1m);
      });

      it('should add only unique OHLCVT1m to an array', () => {
        const oHLCVT1mArray: IOHLCVT1m[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const oHLCVT1mCollection: IOHLCVT1m[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT1mToCollectionIfMissing(oHLCVT1mCollection, ...oHLCVT1mArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const oHLCVT1m: IOHLCVT1m = sampleWithRequiredData;
        const oHLCVT1m2: IOHLCVT1m = sampleWithPartialData;
        expectedResult = service.addOHLCVT1mToCollectionIfMissing([], oHLCVT1m, oHLCVT1m2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT1m);
        expect(expectedResult).toContain(oHLCVT1m2);
      });

      it('should accept null and undefined values', () => {
        const oHLCVT1m: IOHLCVT1m = sampleWithRequiredData;
        expectedResult = service.addOHLCVT1mToCollectionIfMissing([], null, oHLCVT1m, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT1m);
      });

      it('should return initial array if no OHLCVT1m is added', () => {
        const oHLCVT1mCollection: IOHLCVT1m[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT1mToCollectionIfMissing(oHLCVT1mCollection, undefined, null);
        expect(expectedResult).toEqual(oHLCVT1mCollection);
      });
    });

    describe('compareOHLCVT1m', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOHLCVT1m(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOHLCVT1m(entity1, entity2);
        const compareResult2 = service.compareOHLCVT1m(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOHLCVT1m(entity1, entity2);
        const compareResult2 = service.compareOHLCVT1m(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOHLCVT1m(entity1, entity2);
        const compareResult2 = service.compareOHLCVT1m(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
