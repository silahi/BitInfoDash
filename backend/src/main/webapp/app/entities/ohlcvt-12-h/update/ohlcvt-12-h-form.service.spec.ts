import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ohlcvt-12-h.test-samples';

import { OHLCVT12hFormService } from './ohlcvt-12-h-form.service';

describe('OHLCVT12h Form Service', () => {
  let service: OHLCVT12hFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OHLCVT12hFormService);
  });

  describe('Service methods', () => {
    describe('createOHLCVT12hFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOHLCVT12hFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            timestamp: expect.any(Object),
            open: expect.any(Object),
            high: expect.any(Object),
            low: expect.any(Object),
            close: expect.any(Object),
            volume: expect.any(Object),
            trades: expect.any(Object),
          }),
        );
      });

      it('passing IOHLCVT12h should create a new form with FormGroup', () => {
        const formGroup = service.createOHLCVT12hFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            timestamp: expect.any(Object),
            open: expect.any(Object),
            high: expect.any(Object),
            low: expect.any(Object),
            close: expect.any(Object),
            volume: expect.any(Object),
            trades: expect.any(Object),
          }),
        );
      });
    });

    describe('getOHLCVT12h', () => {
      it('should return NewOHLCVT12h for default OHLCVT12h initial value', () => {
        const formGroup = service.createOHLCVT12hFormGroup(sampleWithNewData);

        const oHLCVT12h = service.getOHLCVT12h(formGroup) as any;

        expect(oHLCVT12h).toMatchObject(sampleWithNewData);
      });

      it('should return NewOHLCVT12h for empty OHLCVT12h initial value', () => {
        const formGroup = service.createOHLCVT12hFormGroup();

        const oHLCVT12h = service.getOHLCVT12h(formGroup) as any;

        expect(oHLCVT12h).toMatchObject({});
      });

      it('should return IOHLCVT12h', () => {
        const formGroup = service.createOHLCVT12hFormGroup(sampleWithRequiredData);

        const oHLCVT12h = service.getOHLCVT12h(formGroup) as any;

        expect(oHLCVT12h).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOHLCVT12h should not enable id FormControl', () => {
        const formGroup = service.createOHLCVT12hFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOHLCVT12h should disable id FormControl', () => {
        const formGroup = service.createOHLCVT12hFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
