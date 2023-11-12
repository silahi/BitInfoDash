import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BlockchainAnalyticsService } from '../service/blockchain-analytics.service';
import { IBlockchainAnalytics } from '../blockchain-analytics.model';
import { BlockchainAnalyticsFormService } from './blockchain-analytics-form.service';

import { BlockchainAnalyticsUpdateComponent } from './blockchain-analytics-update.component';

describe('BlockchainAnalytics Management Update Component', () => {
  let comp: BlockchainAnalyticsUpdateComponent;
  let fixture: ComponentFixture<BlockchainAnalyticsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let blockchainAnalyticsFormService: BlockchainAnalyticsFormService;
  let blockchainAnalyticsService: BlockchainAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), BlockchainAnalyticsUpdateComponent],
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
      .overrideTemplate(BlockchainAnalyticsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BlockchainAnalyticsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    blockchainAnalyticsFormService = TestBed.inject(BlockchainAnalyticsFormService);
    blockchainAnalyticsService = TestBed.inject(BlockchainAnalyticsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const blockchainAnalytics: IBlockchainAnalytics = { id: 456 };

      activatedRoute.data = of({ blockchainAnalytics });
      comp.ngOnInit();

      expect(comp.blockchainAnalytics).toEqual(blockchainAnalytics);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBlockchainAnalytics>>();
      const blockchainAnalytics = { id: 123 };
      jest.spyOn(blockchainAnalyticsFormService, 'getBlockchainAnalytics').mockReturnValue(blockchainAnalytics);
      jest.spyOn(blockchainAnalyticsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ blockchainAnalytics });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: blockchainAnalytics }));
      saveSubject.complete();

      // THEN
      expect(blockchainAnalyticsFormService.getBlockchainAnalytics).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(blockchainAnalyticsService.update).toHaveBeenCalledWith(expect.objectContaining(blockchainAnalytics));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBlockchainAnalytics>>();
      const blockchainAnalytics = { id: 123 };
      jest.spyOn(blockchainAnalyticsFormService, 'getBlockchainAnalytics').mockReturnValue({ id: null });
      jest.spyOn(blockchainAnalyticsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ blockchainAnalytics: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: blockchainAnalytics }));
      saveSubject.complete();

      // THEN
      expect(blockchainAnalyticsFormService.getBlockchainAnalytics).toHaveBeenCalled();
      expect(blockchainAnalyticsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBlockchainAnalytics>>();
      const blockchainAnalytics = { id: 123 };
      jest.spyOn(blockchainAnalyticsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ blockchainAnalytics });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(blockchainAnalyticsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
