import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBitcoinAddress } from '../bitcoin-address.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../bitcoin-address.test-samples';

import { BitcoinAddressService } from './bitcoin-address.service';

const requireRestSample: IBitcoinAddress = {
  ...sampleWithRequiredData,
};

describe('BitcoinAddress Service', () => {
  let service: BitcoinAddressService;
  let httpMock: HttpTestingController;
  let expectedResult: IBitcoinAddress | IBitcoinAddress[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BitcoinAddressService);
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

    it('should create a BitcoinAddress', () => {
      const bitcoinAddress = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(bitcoinAddress).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BitcoinAddress', () => {
      const bitcoinAddress = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(bitcoinAddress).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BitcoinAddress', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BitcoinAddress', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BitcoinAddress', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBitcoinAddressToCollectionIfMissing', () => {
      it('should add a BitcoinAddress to an empty array', () => {
        const bitcoinAddress: IBitcoinAddress = sampleWithRequiredData;
        expectedResult = service.addBitcoinAddressToCollectionIfMissing([], bitcoinAddress);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bitcoinAddress);
      });

      it('should not add a BitcoinAddress to an array that contains it', () => {
        const bitcoinAddress: IBitcoinAddress = sampleWithRequiredData;
        const bitcoinAddressCollection: IBitcoinAddress[] = [
          {
            ...bitcoinAddress,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBitcoinAddressToCollectionIfMissing(bitcoinAddressCollection, bitcoinAddress);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BitcoinAddress to an array that doesn't contain it", () => {
        const bitcoinAddress: IBitcoinAddress = sampleWithRequiredData;
        const bitcoinAddressCollection: IBitcoinAddress[] = [sampleWithPartialData];
        expectedResult = service.addBitcoinAddressToCollectionIfMissing(bitcoinAddressCollection, bitcoinAddress);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bitcoinAddress);
      });

      it('should add only unique BitcoinAddress to an array', () => {
        const bitcoinAddressArray: IBitcoinAddress[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const bitcoinAddressCollection: IBitcoinAddress[] = [sampleWithRequiredData];
        expectedResult = service.addBitcoinAddressToCollectionIfMissing(bitcoinAddressCollection, ...bitcoinAddressArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bitcoinAddress: IBitcoinAddress = sampleWithRequiredData;
        const bitcoinAddress2: IBitcoinAddress = sampleWithPartialData;
        expectedResult = service.addBitcoinAddressToCollectionIfMissing([], bitcoinAddress, bitcoinAddress2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bitcoinAddress);
        expect(expectedResult).toContain(bitcoinAddress2);
      });

      it('should accept null and undefined values', () => {
        const bitcoinAddress: IBitcoinAddress = sampleWithRequiredData;
        expectedResult = service.addBitcoinAddressToCollectionIfMissing([], null, bitcoinAddress, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bitcoinAddress);
      });

      it('should return initial array if no BitcoinAddress is added', () => {
        const bitcoinAddressCollection: IBitcoinAddress[] = [sampleWithRequiredData];
        expectedResult = service.addBitcoinAddressToCollectionIfMissing(bitcoinAddressCollection, undefined, null);
        expect(expectedResult).toEqual(bitcoinAddressCollection);
      });
    });

    describe('compareBitcoinAddress', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBitcoinAddress(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBitcoinAddress(entity1, entity2);
        const compareResult2 = service.compareBitcoinAddress(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBitcoinAddress(entity1, entity2);
        const compareResult2 = service.compareBitcoinAddress(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBitcoinAddress(entity1, entity2);
        const compareResult2 = service.compareBitcoinAddress(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
