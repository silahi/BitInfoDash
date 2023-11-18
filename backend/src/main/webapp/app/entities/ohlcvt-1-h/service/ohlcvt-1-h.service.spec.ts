import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOHLCVT1h } from '../ohlcvt-1-h.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ohlcvt-1-h.test-samples';

import { OHLCVT1hService, RestOHLCVT1h } from './ohlcvt-1-h.service';

const requireRestSample: RestOHLCVT1h = {
  ...sampleWithRequiredData,
  timestamp: sampleWithRequiredData.timestamp?.toJSON(),
};

describe('OHLCVT1h Service', () => {
  let service: OHLCVT1hService;
  let httpMock: HttpTestingController;
  let expectedResult: IOHLCVT1h | IOHLCVT1h[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OHLCVT1hService);
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

    it('should create a OHLCVT1h', () => {
      const oHLCVT1h = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(oHLCVT1h).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OHLCVT1h', () => {
      const oHLCVT1h = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(oHLCVT1h).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OHLCVT1h', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OHLCVT1h', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OHLCVT1h', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOHLCVT1hToCollectionIfMissing', () => {
      it('should add a OHLCVT1h to an empty array', () => {
        const oHLCVT1h: IOHLCVT1h = sampleWithRequiredData;
        expectedResult = service.addOHLCVT1hToCollectionIfMissing([], oHLCVT1h);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT1h);
      });

      it('should not add a OHLCVT1h to an array that contains it', () => {
        const oHLCVT1h: IOHLCVT1h = sampleWithRequiredData;
        const oHLCVT1hCollection: IOHLCVT1h[] = [
          {
            ...oHLCVT1h,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOHLCVT1hToCollectionIfMissing(oHLCVT1hCollection, oHLCVT1h);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OHLCVT1h to an array that doesn't contain it", () => {
        const oHLCVT1h: IOHLCVT1h = sampleWithRequiredData;
        const oHLCVT1hCollection: IOHLCVT1h[] = [sampleWithPartialData];
        expectedResult = service.addOHLCVT1hToCollectionIfMissing(oHLCVT1hCollection, oHLCVT1h);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT1h);
      });

      it('should add only unique OHLCVT1h to an array', () => {
        const oHLCVT1hArray: IOHLCVT1h[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const oHLCVT1hCollection: IOHLCVT1h[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT1hToCollectionIfMissing(oHLCVT1hCollection, ...oHLCVT1hArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const oHLCVT1h: IOHLCVT1h = sampleWithRequiredData;
        const oHLCVT1h2: IOHLCVT1h = sampleWithPartialData;
        expectedResult = service.addOHLCVT1hToCollectionIfMissing([], oHLCVT1h, oHLCVT1h2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT1h);
        expect(expectedResult).toContain(oHLCVT1h2);
      });

      it('should accept null and undefined values', () => {
        const oHLCVT1h: IOHLCVT1h = sampleWithRequiredData;
        expectedResult = service.addOHLCVT1hToCollectionIfMissing([], null, oHLCVT1h, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT1h);
      });

      it('should return initial array if no OHLCVT1h is added', () => {
        const oHLCVT1hCollection: IOHLCVT1h[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT1hToCollectionIfMissing(oHLCVT1hCollection, undefined, null);
        expect(expectedResult).toEqual(oHLCVT1hCollection);
      });
    });

    describe('compareOHLCVT1h', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOHLCVT1h(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOHLCVT1h(entity1, entity2);
        const compareResult2 = service.compareOHLCVT1h(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOHLCVT1h(entity1, entity2);
        const compareResult2 = service.compareOHLCVT1h(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOHLCVT1h(entity1, entity2);
        const compareResult2 = service.compareOHLCVT1h(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
