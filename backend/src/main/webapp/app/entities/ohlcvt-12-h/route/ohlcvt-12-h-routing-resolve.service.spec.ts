import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IOHLCVT12h } from '../ohlcvt-12-h.model';
import { OHLCVT12hService } from '../service/ohlcvt-12-h.service';

import oHLCVT12hResolve from './ohlcvt-12-h-routing-resolve.service';

describe('OHLCVT12h routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: OHLCVT12hService;
  let resultOHLCVT12h: IOHLCVT12h | null | undefined;

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
    service = TestBed.inject(OHLCVT12hService);
    resultOHLCVT12h = undefined;
  });

  describe('resolve', () => {
    it('should return IOHLCVT12h returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        oHLCVT12hResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultOHLCVT12h = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultOHLCVT12h).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        oHLCVT12hResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultOHLCVT12h = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultOHLCVT12h).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IOHLCVT12h>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        oHLCVT12hResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultOHLCVT12h = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultOHLCVT12h).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
