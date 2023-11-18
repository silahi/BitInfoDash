import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OHLCVT15mService } from '../service/ohlcvt-15-m.service';
import { IOHLCVT15m } from '../ohlcvt-15-m.model';
import { OHLCVT15mFormService } from './ohlcvt-15-m-form.service';

import { OHLCVT15mUpdateComponent } from './ohlcvt-15-m-update.component';

describe('OHLCVT15m Management Update Component', () => {
  let comp: OHLCVT15mUpdateComponent;
  let fixture: ComponentFixture<OHLCVT15mUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let oHLCVT15mFormService: OHLCVT15mFormService;
  let oHLCVT15mService: OHLCVT15mService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), OHLCVT15mUpdateComponent],
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
      .overrideTemplate(OHLCVT15mUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT15mUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    oHLCVT15mFormService = TestBed.inject(OHLCVT15mFormService);
    oHLCVT15mService = TestBed.inject(OHLCVT15mService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const oHLCVT15m: IOHLCVT15m = { id: 456 };

      activatedRoute.data = of({ oHLCVT15m });
      comp.ngOnInit();

      expect(comp.oHLCVT15m).toEqual(oHLCVT15m);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT15m>>();
      const oHLCVT15m = { id: 123 };
      jest.spyOn(oHLCVT15mFormService, 'getOHLCVT15m').mockReturnValue(oHLCVT15m);
      jest.spyOn(oHLCVT15mService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT15m });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT15m }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT15mFormService.getOHLCVT15m).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(oHLCVT15mService.update).toHaveBeenCalledWith(expect.objectContaining(oHLCVT15m));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT15m>>();
      const oHLCVT15m = { id: 123 };
      jest.spyOn(oHLCVT15mFormService, 'getOHLCVT15m').mockReturnValue({ id: null });
      jest.spyOn(oHLCVT15mService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT15m: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT15m }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT15mFormService.getOHLCVT15m).toHaveBeenCalled();
      expect(oHLCVT15mService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT15m>>();
      const oHLCVT15m = { id: 123 };
      jest.spyOn(oHLCVT15mService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT15m });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(oHLCVT15mService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
