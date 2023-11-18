import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ohlcvt-1-h.test-samples';

import { OHLCVT1hFormService } from './ohlcvt-1-h-form.service';

describe('OHLCVT1h Form Service', () => {
  let service: OHLCVT1hFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OHLCVT1hFormService);
  });

  describe('Service methods', () => {
    describe('createOHLCVT1hFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOHLCVT1hFormGroup();

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

      it('passing IOHLCVT1h should create a new form with FormGroup', () => {
        const formGroup = service.createOHLCVT1hFormGroup(sampleWithRequiredData);

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

    describe('getOHLCVT1h', () => {
      it('should return NewOHLCVT1h for default OHLCVT1h initial value', () => {
        const formGroup = service.createOHLCVT1hFormGroup(sampleWithNewData);

        const oHLCVT1h = service.getOHLCVT1h(formGroup) as any;

        expect(oHLCVT1h).toMatchObject(sampleWithNewData);
      });

      it('should return NewOHLCVT1h for empty OHLCVT1h initial value', () => {
        const formGroup = service.createOHLCVT1hFormGroup();

        const oHLCVT1h = service.getOHLCVT1h(formGroup) as any;

        expect(oHLCVT1h).toMatchObject({});
      });

      it('should return IOHLCVT1h', () => {
        const formGroup = service.createOHLCVT1hFormGroup(sampleWithRequiredData);

        const oHLCVT1h = service.getOHLCVT1h(formGroup) as any;

        expect(oHLCVT1h).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOHLCVT1h should not enable id FormControl', () => {
        const formGroup = service.createOHLCVT1hFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOHLCVT1h should disable id FormControl', () => {
        const formGroup = service.createOHLCVT1hFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
