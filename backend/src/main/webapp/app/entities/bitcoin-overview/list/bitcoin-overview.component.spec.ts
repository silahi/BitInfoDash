import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BitcoinOverviewService } from '../service/bitcoin-overview.service';

import { BitcoinOverviewComponent } from './bitcoin-overview.component';

describe('BitcoinOverview Management Component', () => {
  let comp: BitcoinOverviewComponent;
  let fixture: ComponentFixture<BitcoinOverviewComponent>;
  let service: BitcoinOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'bitcoin-overview', component: BitcoinOverviewComponent }]),
        HttpClientTestingModule,
        BitcoinOverviewComponent,
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
      .overrideTemplate(BitcoinOverviewComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BitcoinOverviewComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(BitcoinOverviewService);

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
    expect(comp.bitcoinOverviews?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to bitcoinOverviewService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getBitcoinOverviewIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getBitcoinOverviewIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
