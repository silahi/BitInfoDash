import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ohlcvt-1-d.test-samples';

import { OHLCVT1dFormService } from './ohlcvt-1-d-form.service';

describe('OHLCVT1d Form Service', () => {
  let service: OHLCVT1dFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OHLCVT1dFormService);
  });

  describe('Service methods', () => {
    describe('createOHLCVT1dFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOHLCVT1dFormGroup();

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

      it('passing IOHLCVT1d should create a new form with FormGroup', () => {
        const formGroup = service.createOHLCVT1dFormGroup(sampleWithRequiredData);

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

    describe('getOHLCVT1d', () => {
      it('should return NewOHLCVT1d for default OHLCVT1d initial value', () => {
        const formGroup = service.createOHLCVT1dFormGroup(sampleWithNewData);

        const oHLCVT1d = service.getOHLCVT1d(formGroup) as any;

        expect(oHLCVT1d).toMatchObject(sampleWithNewData);
      });

      it('should return NewOHLCVT1d for empty OHLCVT1d initial value', () => {
        const formGroup = service.createOHLCVT1dFormGroup();

        const oHLCVT1d = service.getOHLCVT1d(formGroup) as any;

        expect(oHLCVT1d).toMatchObject({});
      });

      it('should return IOHLCVT1d', () => {
        const formGroup = service.createOHLCVT1dFormGroup(sampleWithRequiredData);

        const oHLCVT1d = service.getOHLCVT1d(formGroup) as any;

        expect(oHLCVT1d).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOHLCVT1d should not enable id FormControl', () => {
        const formGroup = service.createOHLCVT1dFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOHLCVT1d should disable id FormControl', () => {
        const formGroup = service.createOHLCVT1dFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
