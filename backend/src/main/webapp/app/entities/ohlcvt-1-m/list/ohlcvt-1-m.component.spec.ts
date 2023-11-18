import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OHLCVT1mService } from '../service/ohlcvt-1-m.service';

import { OHLCVT1mComponent } from './ohlcvt-1-m.component';

describe('OHLCVT1m Management Component', () => {
  let comp: OHLCVT1mComponent;
  let fixture: ComponentFixture<OHLCVT1mComponent>;
  let service: OHLCVT1mService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'ohlcvt-1-m', component: OHLCVT1mComponent }]),
        HttpClientTestingModule,
        OHLCVT1mComponent,
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
      .overrideTemplate(OHLCVT1mComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT1mComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OHLCVT1mService);

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
    expect(comp.oHLCVT1ms?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to oHLCVT1mService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOHLCVT1mIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOHLCVT1mIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
