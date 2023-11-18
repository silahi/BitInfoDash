import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OHLCVT5mService } from '../service/ohlcvt-5-m.service';
import { IOHLCVT5m } from '../ohlcvt-5-m.model';
import { OHLCVT5mFormService } from './ohlcvt-5-m-form.service';

import { OHLCVT5mUpdateComponent } from './ohlcvt-5-m-update.component';

describe('OHLCVT5m Management Update Component', () => {
  let comp: OHLCVT5mUpdateComponent;
  let fixture: ComponentFixture<OHLCVT5mUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let oHLCVT5mFormService: OHLCVT5mFormService;
  let oHLCVT5mService: OHLCVT5mService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), OHLCVT5mUpdateComponent],
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
      .overrideTemplate(OHLCVT5mUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT5mUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    oHLCVT5mFormService = TestBed.inject(OHLCVT5mFormService);
    oHLCVT5mService = TestBed.inject(OHLCVT5mService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const oHLCVT5m: IOHLCVT5m = { id: 456 };

      activatedRoute.data = of({ oHLCVT5m });
      comp.ngOnInit();

      expect(comp.oHLCVT5m).toEqual(oHLCVT5m);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT5m>>();
      const oHLCVT5m = { id: 123 };
      jest.spyOn(oHLCVT5mFormService, 'getOHLCVT5m').mockReturnValue(oHLCVT5m);
      jest.spyOn(oHLCVT5mService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT5m });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT5m }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT5mFormService.getOHLCVT5m).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(oHLCVT5mService.update).toHaveBeenCalledWith(expect.objectContaining(oHLCVT5m));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT5m>>();
      const oHLCVT5m = { id: 123 };
      jest.spyOn(oHLCVT5mFormService, 'getOHLCVT5m').mockReturnValue({ id: null });
      jest.spyOn(oHLCVT5mService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT5m: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT5m }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT5mFormService.getOHLCVT5m).toHaveBeenCalled();
      expect(oHLCVT5mService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT5m>>();
      const oHLCVT5m = { id: 123 };
      jest.spyOn(oHLCVT5mService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT5m });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(oHLCVT5mService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
