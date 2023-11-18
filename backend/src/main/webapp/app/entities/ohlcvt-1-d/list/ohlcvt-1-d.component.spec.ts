import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OHLCVT1dService } from '../service/ohlcvt-1-d.service';

import { OHLCVT1dComponent } from './ohlcvt-1-d.component';

describe('OHLCVT1d Management Component', () => {
  let comp: OHLCVT1dComponent;
  let fixture: ComponentFixture<OHLCVT1dComponent>;
  let service: OHLCVT1dService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'ohlcvt-1-d', component: OHLCVT1dComponent }]),
        HttpClientTestingModule,
        OHLCVT1dComponent,
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
      .overrideTemplate(OHLCVT1dComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT1dComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OHLCVT1dService);

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
    expect(comp.oHLCVT1ds?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to oHLCVT1dService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOHLCVT1dIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOHLCVT1dIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
