import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OHLCVT1dService } from '../service/ohlcvt-1-d.service';
import { IOHLCVT1d } from '../ohlcvt-1-d.model';
import { OHLCVT1dFormService } from './ohlcvt-1-d-form.service';

import { OHLCVT1dUpdateComponent } from './ohlcvt-1-d-update.component';

describe('OHLCVT1d Management Update Component', () => {
  let comp: OHLCVT1dUpdateComponent;
  let fixture: ComponentFixture<OHLCVT1dUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let oHLCVT1dFormService: OHLCVT1dFormService;
  let oHLCVT1dService: OHLCVT1dService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), OHLCVT1dUpdateComponent],
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
      .overrideTemplate(OHLCVT1dUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT1dUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    oHLCVT1dFormService = TestBed.inject(OHLCVT1dFormService);
    oHLCVT1dService = TestBed.inject(OHLCVT1dService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const oHLCVT1d: IOHLCVT1d = { id: 456 };

      activatedRoute.data = of({ oHLCVT1d });
      comp.ngOnInit();

      expect(comp.oHLCVT1d).toEqual(oHLCVT1d);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT1d>>();
      const oHLCVT1d = { id: 123 };
      jest.spyOn(oHLCVT1dFormService, 'getOHLCVT1d').mockReturnValue(oHLCVT1d);
      jest.spyOn(oHLCVT1dService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT1d });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT1d }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT1dFormService.getOHLCVT1d).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(oHLCVT1dService.update).toHaveBeenCalledWith(expect.objectContaining(oHLCVT1d));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT1d>>();
      const oHLCVT1d = { id: 123 };
      jest.spyOn(oHLCVT1dFormService, 'getOHLCVT1d').mockReturnValue({ id: null });
      jest.spyOn(oHLCVT1dService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT1d: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT1d }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT1dFormService.getOHLCVT1d).toHaveBeenCalled();
      expect(oHLCVT1dService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT1d>>();
      const oHLCVT1d = { id: 123 };
      jest.spyOn(oHLCVT1dService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT1d });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(oHLCVT1dService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
