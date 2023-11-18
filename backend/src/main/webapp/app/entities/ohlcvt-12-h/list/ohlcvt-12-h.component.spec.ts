import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OHLCVT12hService } from '../service/ohlcvt-12-h.service';

import { OHLCVT12hComponent } from './ohlcvt-12-h.component';

describe('OHLCVT12h Management Component', () => {
  let comp: OHLCVT12hComponent;
  let fixture: ComponentFixture<OHLCVT12hComponent>;
  let service: OHLCVT12hService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'ohlcvt-12-h', component: OHLCVT12hComponent }]),
        HttpClientTestingModule,
        OHLCVT12hComponent,
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
      .overrideTemplate(OHLCVT12hComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT12hComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OHLCVT12hService);

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
    expect(comp.oHLCVT12hs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to oHLCVT12hService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOHLCVT12hIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOHLCVT12hIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
