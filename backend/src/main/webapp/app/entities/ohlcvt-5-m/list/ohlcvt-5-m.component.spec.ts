import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OHLCVT5mService } from '../service/ohlcvt-5-m.service';

import { OHLCVT5mComponent } from './ohlcvt-5-m.component';

describe('OHLCVT5m Management Component', () => {
  let comp: OHLCVT5mComponent;
  let fixture: ComponentFixture<OHLCVT5mComponent>;
  let service: OHLCVT5mService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'ohlcvt-5-m', component: OHLCVT5mComponent }]),
        HttpClientTestingModule,
        OHLCVT5mComponent,
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
      .overrideTemplate(OHLCVT5mComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT5mComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OHLCVT5mService);

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
    expect(comp.oHLCVT5ms?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to oHLCVT5mService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOHLCVT5mIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOHLCVT5mIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
