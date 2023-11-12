import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BitcoinOverviewService } from '../service/bitcoin-overview.service';
import { IBitcoinOverview } from '../bitcoin-overview.model';
import { BitcoinOverviewFormService } from './bitcoin-overview-form.service';

import { BitcoinOverviewUpdateComponent } from './bitcoin-overview-update.component';

describe('BitcoinOverview Management Update Component', () => {
  let comp: BitcoinOverviewUpdateComponent;
  let fixture: ComponentFixture<BitcoinOverviewUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bitcoinOverviewFormService: BitcoinOverviewFormService;
  let bitcoinOverviewService: BitcoinOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), BitcoinOverviewUpdateComponent],
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
      .overrideTemplate(BitcoinOverviewUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BitcoinOverviewUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bitcoinOverviewFormService = TestBed.inject(BitcoinOverviewFormService);
    bitcoinOverviewService = TestBed.inject(BitcoinOverviewService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const bitcoinOverview: IBitcoinOverview = { id: 456 };

      activatedRoute.data = of({ bitcoinOverview });
      comp.ngOnInit();

      expect(comp.bitcoinOverview).toEqual(bitcoinOverview);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBitcoinOverview>>();
      const bitcoinOverview = { id: 123 };
      jest.spyOn(bitcoinOverviewFormService, 'getBitcoinOverview').mockReturnValue(bitcoinOverview);
      jest.spyOn(bitcoinOverviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bitcoinOverview });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bitcoinOverview }));
      saveSubject.complete();

      // THEN
      expect(bitcoinOverviewFormService.getBitcoinOverview).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bitcoinOverviewService.update).toHaveBeenCalledWith(expect.objectContaining(bitcoinOverview));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBitcoinOverview>>();
      const bitcoinOverview = { id: 123 };
      jest.spyOn(bitcoinOverviewFormService, 'getBitcoinOverview').mockReturnValue({ id: null });
      jest.spyOn(bitcoinOverviewService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bitcoinOverview: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bitcoinOverview }));
      saveSubject.complete();

      // THEN
      expect(bitcoinOverviewFormService.getBitcoinOverview).toHaveBeenCalled();
      expect(bitcoinOverviewService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBitcoinOverview>>();
      const bitcoinOverview = { id: 123 };
      jest.spyOn(bitcoinOverviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bitcoinOverview });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bitcoinOverviewService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
