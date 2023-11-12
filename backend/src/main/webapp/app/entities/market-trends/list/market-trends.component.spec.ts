import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MarketTrendsService } from '../service/market-trends.service';

import { MarketTrendsComponent } from './market-trends.component';

describe('MarketTrends Management Component', () => {
  let comp: MarketTrendsComponent;
  let fixture: ComponentFixture<MarketTrendsComponent>;
  let service: MarketTrendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'market-trends', component: MarketTrendsComponent }]),
        HttpClientTestingModule,
        MarketTrendsComponent,
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
      .overrideTemplate(MarketTrendsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MarketTrendsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MarketTrendsService);

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
    expect(comp.marketTrends?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to marketTrendsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getMarketTrendsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getMarketTrendsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
