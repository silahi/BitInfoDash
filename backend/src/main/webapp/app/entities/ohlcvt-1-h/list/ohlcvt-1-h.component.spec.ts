import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OHLCVT1hService } from '../service/ohlcvt-1-h.service';

import { OHLCVT1hComponent } from './ohlcvt-1-h.component';

describe('OHLCVT1h Management Component', () => {
  let comp: OHLCVT1hComponent;
  let fixture: ComponentFixture<OHLCVT1hComponent>;
  let service: OHLCVT1hService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'ohlcvt-1-h', component: OHLCVT1hComponent }]),
        HttpClientTestingModule,
        OHLCVT1hComponent,
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
      .overrideTemplate(OHLCVT1hComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT1hComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OHLCVT1hService);

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
    expect(comp.oHLCVT1hs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to oHLCVT1hService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOHLCVT1hIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOHLCVT1hIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
