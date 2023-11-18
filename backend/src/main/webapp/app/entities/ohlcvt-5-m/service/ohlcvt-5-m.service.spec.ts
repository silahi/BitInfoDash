import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOHLCVT5m } from '../ohlcvt-5-m.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ohlcvt-5-m.test-samples';

import { OHLCVT5mService, RestOHLCVT5m } from './ohlcvt-5-m.service';

const requireRestSample: RestOHLCVT5m = {
  ...sampleWithRequiredData,
  timestamp: sampleWithRequiredData.timestamp?.toJSON(),
};

describe('OHLCVT5m Service', () => {
  let service: OHLCVT5mService;
  let httpMock: HttpTestingController;
  let expectedResult: IOHLCVT5m | IOHLCVT5m[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OHLCVT5mService);
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

    it('should create a OHLCVT5m', () => {
      const oHLCVT5m = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(oHLCVT5m).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OHLCVT5m', () => {
      const oHLCVT5m = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(oHLCVT5m).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OHLCVT5m', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OHLCVT5m', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OHLCVT5m', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOHLCVT5mToCollectionIfMissing', () => {
      it('should add a OHLCVT5m to an empty array', () => {
        const oHLCVT5m: IOHLCVT5m = sampleWithRequiredData;
        expectedResult = service.addOHLCVT5mToCollectionIfMissing([], oHLCVT5m);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT5m);
      });

      it('should not add a OHLCVT5m to an array that contains it', () => {
        const oHLCVT5m: IOHLCVT5m = sampleWithRequiredData;
        const oHLCVT5mCollection: IOHLCVT5m[] = [
          {
            ...oHLCVT5m,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOHLCVT5mToCollectionIfMissing(oHLCVT5mCollection, oHLCVT5m);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OHLCVT5m to an array that doesn't contain it", () => {
        const oHLCVT5m: IOHLCVT5m = sampleWithRequiredData;
        const oHLCVT5mCollection: IOHLCVT5m[] = [sampleWithPartialData];
        expectedResult = service.addOHLCVT5mToCollectionIfMissing(oHLCVT5mCollection, oHLCVT5m);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT5m);
      });

      it('should add only unique OHLCVT5m to an array', () => {
        const oHLCVT5mArray: IOHLCVT5m[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const oHLCVT5mCollection: IOHLCVT5m[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT5mToCollectionIfMissing(oHLCVT5mCollection, ...oHLCVT5mArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const oHLCVT5m: IOHLCVT5m = sampleWithRequiredData;
        const oHLCVT5m2: IOHLCVT5m = sampleWithPartialData;
        expectedResult = service.addOHLCVT5mToCollectionIfMissing([], oHLCVT5m, oHLCVT5m2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT5m);
        expect(expectedResult).toContain(oHLCVT5m2);
      });

      it('should accept null and undefined values', () => {
        const oHLCVT5m: IOHLCVT5m = sampleWithRequiredData;
        expectedResult = service.addOHLCVT5mToCollectionIfMissing([], null, oHLCVT5m, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT5m);
      });

      it('should return initial array if no OHLCVT5m is added', () => {
        const oHLCVT5mCollection: IOHLCVT5m[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT5mToCollectionIfMissing(oHLCVT5mCollection, undefined, null);
        expect(expectedResult).toEqual(oHLCVT5mCollection);
      });
    });

    describe('compareOHLCVT5m', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOHLCVT5m(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOHLCVT5m(entity1, entity2);
        const compareResult2 = service.compareOHLCVT5m(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOHLCVT5m(entity1, entity2);
        const compareResult2 = service.compareOHLCVT5m(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOHLCVT5m(entity1, entity2);
        const compareResult2 = service.compareOHLCVT5m(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
