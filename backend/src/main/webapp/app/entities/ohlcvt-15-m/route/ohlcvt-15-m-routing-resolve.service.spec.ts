import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IOHLCVT15m } from '../ohlcvt-15-m.model';
import { OHLCVT15mService } from '../service/ohlcvt-15-m.service';

import oHLCVT15mResolve from './ohlcvt-15-m-routing-resolve.service';

describe('OHLCVT15m routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: OHLCVT15mService;
  let resultOHLCVT15m: IOHLCVT15m | null | undefined;

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
    service = TestBed.inject(OHLCVT15mService);
    resultOHLCVT15m = undefined;
  });

  describe('resolve', () => {
    it('should return IOHLCVT15m returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        oHLCVT15mResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultOHLCVT15m = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultOHLCVT15m).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        oHLCVT15mResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultOHLCVT15m = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultOHLCVT15m).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IOHLCVT15m>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        oHLCVT15mResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultOHLCVT15m = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultOHLCVT15m).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
