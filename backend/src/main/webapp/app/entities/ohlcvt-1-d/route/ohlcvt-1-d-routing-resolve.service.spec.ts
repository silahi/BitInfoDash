import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IOHLCVT1d } from '../ohlcvt-1-d.model';
import { OHLCVT1dService } from '../service/ohlcvt-1-d.service';

import oHLCVT1dResolve from './ohlcvt-1-d-routing-resolve.service';

describe('OHLCVT1d routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: OHLCVT1dService;
  let resultOHLCVT1d: IOHLCVT1d | null | undefined;

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
    service = TestBed.inject(OHLCVT1dService);
    resultOHLCVT1d = undefined;
  });

  describe('resolve', () => {
    it('should return IOHLCVT1d returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        oHLCVT1dResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultOHLCVT1d = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultOHLCVT1d).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        oHLCVT1dResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultOHLCVT1d = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultOHLCVT1d).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IOHLCVT1d>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        oHLCVT1dResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultOHLCVT1d = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultOHLCVT1d).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
