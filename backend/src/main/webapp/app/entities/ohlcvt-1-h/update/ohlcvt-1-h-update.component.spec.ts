import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OHLCVT1hService } from '../service/ohlcvt-1-h.service';
import { IOHLCVT1h } from '../ohlcvt-1-h.model';
import { OHLCVT1hFormService } from './ohlcvt-1-h-form.service';

import { OHLCVT1hUpdateComponent } from './ohlcvt-1-h-update.component';

describe('OHLCVT1h Management Update Component', () => {
  let comp: OHLCVT1hUpdateComponent;
  let fixture: ComponentFixture<OHLCVT1hUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let oHLCVT1hFormService: OHLCVT1hFormService;
  let oHLCVT1hService: OHLCVT1hService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), OHLCVT1hUpdateComponent],
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
      .overrideTemplate(OHLCVT1hUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT1hUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    oHLCVT1hFormService = TestBed.inject(OHLCVT1hFormService);
    oHLCVT1hService = TestBed.inject(OHLCVT1hService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const oHLCVT1h: IOHLCVT1h = { id: 456 };

      activatedRoute.data = of({ oHLCVT1h });
      comp.ngOnInit();

      expect(comp.oHLCVT1h).toEqual(oHLCVT1h);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT1h>>();
      const oHLCVT1h = { id: 123 };
      jest.spyOn(oHLCVT1hFormService, 'getOHLCVT1h').mockReturnValue(oHLCVT1h);
      jest.spyOn(oHLCVT1hService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT1h });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT1h }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT1hFormService.getOHLCVT1h).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(oHLCVT1hService.update).toHaveBeenCalledWith(expect.objectContaining(oHLCVT1h));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT1h>>();
      const oHLCVT1h = { id: 123 };
      jest.spyOn(oHLCVT1hFormService, 'getOHLCVT1h').mockReturnValue({ id: null });
      jest.spyOn(oHLCVT1hService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT1h: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT1h }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT1hFormService.getOHLCVT1h).toHaveBeenCalled();
      expect(oHLCVT1hService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT1h>>();
      const oHLCVT1h = { id: 123 };
      jest.spyOn(oHLCVT1hService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT1h });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(oHLCVT1hService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
