import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OHLCVT1mService } from '../service/ohlcvt-1-m.service';
import { IOHLCVT1m } from '../ohlcvt-1-m.model';
import { OHLCVT1mFormService } from './ohlcvt-1-m-form.service';

import { OHLCVT1mUpdateComponent } from './ohlcvt-1-m-update.component';

describe('OHLCVT1m Management Update Component', () => {
  let comp: OHLCVT1mUpdateComponent;
  let fixture: ComponentFixture<OHLCVT1mUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let oHLCVT1mFormService: OHLCVT1mFormService;
  let oHLCVT1mService: OHLCVT1mService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), OHLCVT1mUpdateComponent],
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
      .overrideTemplate(OHLCVT1mUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT1mUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    oHLCVT1mFormService = TestBed.inject(OHLCVT1mFormService);
    oHLCVT1mService = TestBed.inject(OHLCVT1mService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const oHLCVT1m: IOHLCVT1m = { id: 456 };

      activatedRoute.data = of({ oHLCVT1m });
      comp.ngOnInit();

      expect(comp.oHLCVT1m).toEqual(oHLCVT1m);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT1m>>();
      const oHLCVT1m = { id: 123 };
      jest.spyOn(oHLCVT1mFormService, 'getOHLCVT1m').mockReturnValue(oHLCVT1m);
      jest.spyOn(oHLCVT1mService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT1m });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT1m }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT1mFormService.getOHLCVT1m).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(oHLCVT1mService.update).toHaveBeenCalledWith(expect.objectContaining(oHLCVT1m));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT1m>>();
      const oHLCVT1m = { id: 123 };
      jest.spyOn(oHLCVT1mFormService, 'getOHLCVT1m').mockReturnValue({ id: null });
      jest.spyOn(oHLCVT1mService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT1m: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT1m }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT1mFormService.getOHLCVT1m).toHaveBeenCalled();
      expect(oHLCVT1mService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT1m>>();
      const oHLCVT1m = { id: 123 };
      jest.spyOn(oHLCVT1mService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT1m });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(oHLCVT1mService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
