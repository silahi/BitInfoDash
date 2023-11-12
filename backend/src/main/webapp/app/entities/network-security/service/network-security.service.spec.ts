import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INetworkSecurity } from '../network-security.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../network-security.test-samples';

import { NetworkSecurityService, RestNetworkSecurity } from './network-security.service';

const requireRestSample: RestNetworkSecurity = {
  ...sampleWithRequiredData,
  timestamp: sampleWithRequiredData.timestamp?.toJSON(),
};

describe('NetworkSecurity Service', () => {
  let service: NetworkSecurityService;
  let httpMock: HttpTestingController;
  let expectedResult: INetworkSecurity | INetworkSecurity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NetworkSecurityService);
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

    it('should create a NetworkSecurity', () => {
      const networkSecurity = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(networkSecurity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NetworkSecurity', () => {
      const networkSecurity = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(networkSecurity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NetworkSecurity', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NetworkSecurity', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a NetworkSecurity', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNetworkSecurityToCollectionIfMissing', () => {
      it('should add a NetworkSecurity to an empty array', () => {
        const networkSecurity: INetworkSecurity = sampleWithRequiredData;
        expectedResult = service.addNetworkSecurityToCollectionIfMissing([], networkSecurity);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(networkSecurity);
      });

      it('should not add a NetworkSecurity to an array that contains it', () => {
        const networkSecurity: INetworkSecurity = sampleWithRequiredData;
        const networkSecurityCollection: INetworkSecurity[] = [
          {
            ...networkSecurity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNetworkSecurityToCollectionIfMissing(networkSecurityCollection, networkSecurity);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NetworkSecurity to an array that doesn't contain it", () => {
        const networkSecurity: INetworkSecurity = sampleWithRequiredData;
        const networkSecurityCollection: INetworkSecurity[] = [sampleWithPartialData];
        expectedResult = service.addNetworkSecurityToCollectionIfMissing(networkSecurityCollection, networkSecurity);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(networkSecurity);
      });

      it('should add only unique NetworkSecurity to an array', () => {
        const networkSecurityArray: INetworkSecurity[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const networkSecurityCollection: INetworkSecurity[] = [sampleWithRequiredData];
        expectedResult = service.addNetworkSecurityToCollectionIfMissing(networkSecurityCollection, ...networkSecurityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const networkSecurity: INetworkSecurity = sampleWithRequiredData;
        const networkSecurity2: INetworkSecurity = sampleWithPartialData;
        expectedResult = service.addNetworkSecurityToCollectionIfMissing([], networkSecurity, networkSecurity2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(networkSecurity);
        expect(expectedResult).toContain(networkSecurity2);
      });

      it('should accept null and undefined values', () => {
        const networkSecurity: INetworkSecurity = sampleWithRequiredData;
        expectedResult = service.addNetworkSecurityToCollectionIfMissing([], null, networkSecurity, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(networkSecurity);
      });

      it('should return initial array if no NetworkSecurity is added', () => {
        const networkSecurityCollection: INetworkSecurity[] = [sampleWithRequiredData];
        expectedResult = service.addNetworkSecurityToCollectionIfMissing(networkSecurityCollection, undefined, null);
        expect(expectedResult).toEqual(networkSecurityCollection);
      });
    });

    describe('compareNetworkSecurity', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNetworkSecurity(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNetworkSecurity(entity1, entity2);
        const compareResult2 = service.compareNetworkSecurity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNetworkSecurity(entity1, entity2);
        const compareResult2 = service.compareNetworkSecurity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNetworkSecurity(entity1, entity2);
        const compareResult2 = service.compareNetworkSecurity(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
