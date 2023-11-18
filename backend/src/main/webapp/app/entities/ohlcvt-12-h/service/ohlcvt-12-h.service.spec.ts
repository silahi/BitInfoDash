import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOHLCVT12h } from '../ohlcvt-12-h.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ohlcvt-12-h.test-samples';

import { OHLCVT12hService, RestOHLCVT12h } from './ohlcvt-12-h.service';

const requireRestSample: RestOHLCVT12h = {
  ...sampleWithRequiredData,
  timestamp: sampleWithRequiredData.timestamp?.toJSON(),
};

describe('OHLCVT12h Service', () => {
  let service: OHLCVT12hService;
  let httpMock: HttpTestingController;
  let expectedResult: IOHLCVT12h | IOHLCVT12h[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OHLCVT12hService);
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

    it('should create a OHLCVT12h', () => {
      const oHLCVT12h = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(oHLCVT12h).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OHLCVT12h', () => {
      const oHLCVT12h = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(oHLCVT12h).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OHLCVT12h', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OHLCVT12h', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OHLCVT12h', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOHLCVT12hToCollectionIfMissing', () => {
      it('should add a OHLCVT12h to an empty array', () => {
        const oHLCVT12h: IOHLCVT12h = sampleWithRequiredData;
        expectedResult = service.addOHLCVT12hToCollectionIfMissing([], oHLCVT12h);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT12h);
      });

      it('should not add a OHLCVT12h to an array that contains it', () => {
        const oHLCVT12h: IOHLCVT12h = sampleWithRequiredData;
        const oHLCVT12hCollection: IOHLCVT12h[] = [
          {
            ...oHLCVT12h,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOHLCVT12hToCollectionIfMissing(oHLCVT12hCollection, oHLCVT12h);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OHLCVT12h to an array that doesn't contain it", () => {
        const oHLCVT12h: IOHLCVT12h = sampleWithRequiredData;
        const oHLCVT12hCollection: IOHLCVT12h[] = [sampleWithPartialData];
        expectedResult = service.addOHLCVT12hToCollectionIfMissing(oHLCVT12hCollection, oHLCVT12h);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT12h);
      });

      it('should add only unique OHLCVT12h to an array', () => {
        const oHLCVT12hArray: IOHLCVT12h[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const oHLCVT12hCollection: IOHLCVT12h[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT12hToCollectionIfMissing(oHLCVT12hCollection, ...oHLCVT12hArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const oHLCVT12h: IOHLCVT12h = sampleWithRequiredData;
        const oHLCVT12h2: IOHLCVT12h = sampleWithPartialData;
        expectedResult = service.addOHLCVT12hToCollectionIfMissing([], oHLCVT12h, oHLCVT12h2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oHLCVT12h);
        expect(expectedResult).toContain(oHLCVT12h2);
      });

      it('should accept null and undefined values', () => {
        const oHLCVT12h: IOHLCVT12h = sampleWithRequiredData;
        expectedResult = service.addOHLCVT12hToCollectionIfMissing([], null, oHLCVT12h, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oHLCVT12h);
      });

      it('should return initial array if no OHLCVT12h is added', () => {
        const oHLCVT12hCollection: IOHLCVT12h[] = [sampleWithRequiredData];
        expectedResult = service.addOHLCVT12hToCollectionIfMissing(oHLCVT12hCollection, undefined, null);
        expect(expectedResult).toEqual(oHLCVT12hCollection);
      });
    });

    describe('compareOHLCVT12h', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOHLCVT12h(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOHLCVT12h(entity1, entity2);
        const compareResult2 = service.compareOHLCVT12h(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOHLCVT12h(entity1, entity2);
        const compareResult2 = service.compareOHLCVT12h(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOHLCVT12h(entity1, entity2);
        const compareResult2 = service.compareOHLCVT12h(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
