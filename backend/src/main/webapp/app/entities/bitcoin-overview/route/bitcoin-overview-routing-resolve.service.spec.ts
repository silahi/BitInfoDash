import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IBitcoinOverview } from '../bitcoin-overview.model';
import { BitcoinOverviewService } from '../service/bitcoin-overview.service';

import bitcoinOverviewResolve from './bitcoin-overview-routing-resolve.service';

describe('BitcoinOverview routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: BitcoinOverviewService;
  let resultBitcoinOverview: IBitcoinOverview | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(BitcoinOverviewService);
    resultBitcoinOverview = undefined;
  });

  describe('resolve', () => {
    it('should return IBitcoinOverview returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        bitcoinOverviewResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultBitcoinOverview = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultBitcoinOverview).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        bitcoinOverviewResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultBitcoinOverview = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultBitcoinOverview).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IBitcoinOverview>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        bitcoinOverviewResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultBitcoinOverview = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultBitcoinOverview).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
