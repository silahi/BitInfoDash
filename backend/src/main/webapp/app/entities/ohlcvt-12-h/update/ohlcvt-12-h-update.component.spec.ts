import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OHLCVT12hService } from '../service/ohlcvt-12-h.service';
import { IOHLCVT12h } from '../ohlcvt-12-h.model';
import { OHLCVT12hFormService } from './ohlcvt-12-h-form.service';

import { OHLCVT12hUpdateComponent } from './ohlcvt-12-h-update.component';

describe('OHLCVT12h Management Update Component', () => {
  let comp: OHLCVT12hUpdateComponent;
  let fixture: ComponentFixture<OHLCVT12hUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let oHLCVT12hFormService: OHLCVT12hFormService;
  let oHLCVT12hService: OHLCVT12hService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), OHLCVT12hUpdateComponent],
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
      .overrideTemplate(OHLCVT12hUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OHLCVT12hUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    oHLCVT12hFormService = TestBed.inject(OHLCVT12hFormService);
    oHLCVT12hService = TestBed.inject(OHLCVT12hService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const oHLCVT12h: IOHLCVT12h = { id: 456 };

      activatedRoute.data = of({ oHLCVT12h });
      comp.ngOnInit();

      expect(comp.oHLCVT12h).toEqual(oHLCVT12h);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT12h>>();
      const oHLCVT12h = { id: 123 };
      jest.spyOn(oHLCVT12hFormService, 'getOHLCVT12h').mockReturnValue(oHLCVT12h);
      jest.spyOn(oHLCVT12hService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT12h });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT12h }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT12hFormService.getOHLCVT12h).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(oHLCVT12hService.update).toHaveBeenCalledWith(expect.objectContaining(oHLCVT12h));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT12h>>();
      const oHLCVT12h = { id: 123 };
      jest.spyOn(oHLCVT12hFormService, 'getOHLCVT12h').mockReturnValue({ id: null });
      jest.spyOn(oHLCVT12hService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT12h: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oHLCVT12h }));
      saveSubject.complete();

      // THEN
      expect(oHLCVT12hFormService.getOHLCVT12h).toHaveBeenCalled();
      expect(oHLCVT12hService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOHLCVT12h>>();
      const oHLCVT12h = { id: 123 };
      jest.spyOn(oHLCVT12hService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oHLCVT12h });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(oHLCVT12hService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
