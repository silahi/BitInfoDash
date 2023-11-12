import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MarketTrendsService } from '../service/market-trends.service';
import { IMarketTrends } from '../market-trends.model';
import { MarketTrendsFormService } from './market-trends-form.service';

import { MarketTrendsUpdateComponent } from './market-trends-update.component';

describe('MarketTrends Management Update Component', () => {
  let comp: MarketTrendsUpdateComponent;
  let fixture: ComponentFixture<MarketTrendsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let marketTrendsFormService: MarketTrendsFormService;
  let marketTrendsService: MarketTrendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), MarketTrendsUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(MarketTrendsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MarketTrendsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    marketTrendsFormService = TestBed.inject(MarketTrendsFormService);
    marketTrendsService = TestBed.inject(MarketTrendsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const marketTrends: IMarketTrends = { id: 456 };

      activatedRoute.data = of({ marketTrends });
      comp.ngOnInit();

      expect(comp.marketTrends).toEqual(marketTrends);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarketTrends>>();
      const marketTrends = { id: 123 };
      jest.spyOn(marketTrendsFormService, 'getMarketTrends').mockReturnValue(marketTrends);
      jest.spyOn(marketTrendsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ marketTrends });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: marketTrends }));
      saveSubject.complete();

      // THEN
      expect(marketTrendsFormService.getMarketTrends).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(marketTrendsService.update).toHaveBeenCalledWith(expect.objectContaining(marketTrends));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarketTrends>>();
      const marketTrends = { id: 123 };
      jest.spyOn(marketTrendsFormService, 'getMarketTrends').mockReturnValue({ id: null });
      jest.spyOn(marketTrendsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ marketTrends: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: marketTrends }));
      saveSubject.complete();

      // THEN
      expect(marketTrendsFormService.getMarketTrends).toHaveBeenCalled();
      expect(marketTrendsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMarketTrends>>();
      const marketTrends = { id: 123 };
      jest.spyOn(marketTrendsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ marketTrends });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(marketTrendsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
