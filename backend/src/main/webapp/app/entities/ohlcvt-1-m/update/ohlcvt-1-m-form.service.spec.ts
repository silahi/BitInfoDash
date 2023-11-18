import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ohlcvt-1-m.test-samples';

import { OHLCVT1mFormService } from './ohlcvt-1-m-form.service';

describe('OHLCVT1m Form Service', () => {
  let service: OHLCVT1mFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OHLCVT1mFormService);
  });

  describe('Service methods', () => {
    describe('createOHLCVT1mFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOHLCVT1mFormGroup();

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

      it('passing IOHLCVT1m should create a new form with FormGroup', () => {
        const formGroup = service.createOHLCVT1mFormGroup(sampleWithRequiredData);

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

    describe('getOHLCVT1m', () => {
      it('should return NewOHLCVT1m for default OHLCVT1m initial value', () => {
        const formGroup = service.createOHLCVT1mFormGroup(sampleWithNewData);

        const oHLCVT1m = service.getOHLCVT1m(formGroup) as any;

        expect(oHLCVT1m).toMatchObject(sampleWithNewData);
      });

      it('should return NewOHLCVT1m for empty OHLCVT1m initial value', () => {
        const formGroup = service.createOHLCVT1mFormGroup();

        const oHLCVT1m = service.getOHLCVT1m(formGroup) as any;

        expect(oHLCVT1m).toMatchObject({});
      });

      it('should return IOHLCVT1m', () => {
        const formGroup = service.createOHLCVT1mFormGroup(sampleWithRequiredData);

        const oHLCVT1m = service.getOHLCVT1m(formGroup) as any;

        expect(oHLCVT1m).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOHLCVT1m should not enable id FormControl', () => {
        const formGroup = service.createOHLCVT1mFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOHLCVT1m should disable id FormControl', () => {
        const formGroup = service.createOHLCVT1mFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
