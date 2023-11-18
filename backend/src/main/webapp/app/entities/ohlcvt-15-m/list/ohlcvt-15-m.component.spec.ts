import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OHLCVT15mService } from '../service/ohlcvt-15-m.service';

import { OHLCVT15mComponent } from './ohlcvt-15-m.component';

describe('OHLCVT15m Management Component', () => {
  let comp: OHLCVT15mComponent;
  let fixture: ComponentFixture<OHLCVT15mComponent>;
  let service: OHLCVT15mService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'ohlcvt-15-m', component: OHLCVT15mComponent }]),
        HttpClientTestingModule,
        OHLCVT15mComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(OHLCVT15mComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT15mComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OHLCVT15mService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.oHLCVT15ms?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to oHLCVT15mService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOHLCVT15mIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOHLCVT15mIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
