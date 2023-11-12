import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BlockchainAnalyticsService } from '../service/blockchain-analytics.service';

import { BlockchainAnalyticsComponent } from './blockchain-analytics.component';

describe('BlockchainAnalytics Management Component', () => {
  let comp: BlockchainAnalyticsComponent;
  let fixture: ComponentFixture<BlockchainAnalyticsComponent>;
  let service: BlockchainAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'blockchain-analytics', component: BlockchainAnalyticsComponent }]),
        HttpClientTestingModule,
        BlockchainAnalyticsComponent,
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
      .overrideTemplate(BlockchainAnalyticsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BlockchainAnalyticsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(BlockchainAnalyticsService);

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
    expect(comp.blockchainAnalytics?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to blockchainAnalyticsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getBlockchainAnalyticsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getBlockchainAnalyticsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
