import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOHLCVT1d } from '../ohlcvt-1-d.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ohlcvt-1-d.test-samples';

import { OHLCVT1dService, RestOHLCVT1d } from './ohlcvt-1-d.service';

const requireRestSample: RestOHLCVT1d = {
  ...sampleWithRequiredData,
  timestamp: sampleWithRequiredData.timestamp?.toJSON(),
};

describe('OHLCVT1d Service', () => {
  let service: OHLCVT1dService;
  let httpMock: HttpTestingController;
  let expectedResult: IOHLCVT1d | IOHLCVT1d[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OHLCVT1dService);
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

    it('should create a OHLCVT1d', () => {
      const oHLCVT1d = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(oHLCVT1d).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OHLCVT1d', () => {
      const oHLCVT1d = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(oHLCVT1d).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OHLCVT1d', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OHLCVT1d', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OHLCVT1d', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOHLCVT1dToCollectionIfMissing', () => {
      it('should add a OHLCVT1d to an empty array', () => {
        const oHLCVT1d: IOHLCVT1d = sampleWithRequiredData;
        expectedResult = service.addOHLCVT1dToCollectionIfMissing([], oHLCVT1d);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT1d);
      });

      it('should not add a OHLCVT1d to an array that contains it', () => {
        const oHLCVT1d: IOHLCVT1d = sampleWithRequiredData;
        const oHLCVT1dCollection: IOHLCVT1d[] = [
          {
            ...oHLCVT1d,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOHLCVT1dToCollectionIfMissing(oHLCVT1dCollection, oHLCVT1d);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OHLCVT1d to an array that doesn't contain it", () => {
        const oHLCVT1d: IOHLCVT1d = sampleWithRequiredData;
        const oHLCVT1dCollection: IOHLCVT1d[] = [sampleWithPartialData];
        expectedResult = service.addOHLCVT1dToCollectionIfMissing(oHLCVT1dCollection, oHLCVT1d);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT1d);
      });

      it('should add only unique OHLCVT1d to an array', () => {
        const oHLCVT1dArray: IOHLCVT1d[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const oHLCVT1dCollection: IOHLCVT1d[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT1dToCollectionIfMissing(oHLCVT1dCollection, ...oHLCVT1dArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const oHLCVT1d: IOHLCVT1d = sampleWithRequiredData;
        const oHLCVT1d2: IOHLCVT1d = sampleWithPartialData;
        expectedResult = service.addOHLCVT1dToCollectionIfMissing([], oHLCVT1d, oHLCVT1d2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT1d);
        expect(expectedResult).toContain(oHLCVT1d2);
      });

      it('should accept null and undefined values', () => {
        const oHLCVT1d: IOHLCVT1d = sampleWithRequiredData;
        expectedResult = service.addOHLCVT1dToCollectionIfMissing([], null, oHLCVT1d, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT1d);
      });

      it('should return initial array if no OHLCVT1d is added', () => {
        const oHLCVT1dCollection: IOHLCVT1d[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT1dToCollectionIfMissing(oHLCVT1dCollection, undefined, null);
        expect(expectedResult).toEqual(oHLCVT1dCollection);
      });
    });

    describe('compareOHLCVT1d', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOHLCVT1d(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOHLCVT1d(entity1, entity2);
        const compareResult2 = service.compareOHLCVT1d(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOHLCVT1d(entity1, entity2);
        const compareResult2 = service.compareOHLCVT1d(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOHLCVT1d(entity1, entity2);
        const compareResult2 = service.compareOHLCVT1d(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
