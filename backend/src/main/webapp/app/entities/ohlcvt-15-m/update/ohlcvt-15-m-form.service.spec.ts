import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ohlcvt-15-m.test-samples';

import { OHLCVT15mFormService } from './ohlcvt-15-m-form.service';

describe('OHLCVT15m Form Service', () => {
  let service: OHLCVT15mFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OHLCVT15mFormService);
  });

  describe('Service methods', () => {
    describe('createOHLCVT15mFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOHLCVT15mFormGroup();

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

      it('passing IOHLCVT15m should create a new form with FormGroup', () => {
        const formGroup = service.createOHLCVT15mFormGroup(sampleWithRequiredData);

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

    describe('getOHLCVT15m', () => {
      it('should return NewOHLCVT15m for default OHLCVT15m initial value', () => {
        const formGroup = service.createOHLCVT15mFormGroup(sampleWithNewData);

        const oHLCVT15m = service.getOHLCVT15m(formGroup) as any;

        expect(oHLCVT15m).toMatchObject(sampleWithNewData);
      });

      it('should return NewOHLCVT15m for empty OHLCVT15m initial value', () => {
        const formGroup = service.createOHLCVT15mFormGroup();

        const oHLCVT15m = service.getOHLCVT15m(formGroup) as any;

        expect(oHLCVT15m).toMatchObject({});
      });

      it('should return IOHLCVT15m', () => {
        const formGroup = service.createOHLCVT15mFormGroup(sampleWithRequiredData);

        const oHLCVT15m = service.getOHLCVT15m(formGroup) as any;

        expect(oHLCVT15m).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOHLCVT15m should not enable id FormControl', () => {
        const formGroup = service.createOHLCVT15mFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOHLCVT15m should disable id FormControl', () => {
        const formGroup = service.createOHLCVT15mFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
