import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ohlcvt-5-m.test-samples';

import { OHLCVT5mFormService } from './ohlcvt-5-m-form.service';

describe('OHLCVT5m Form Service', () => {
  let service: OHLCVT5mFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OHLCVT5mFormService);
  });

  describe('Service methods', () => {
    describe('createOHLCVT5mFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOHLCVT5mFormGroup();

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

      it('passing IOHLCVT5m should create a new form with FormGroup', () => {
        const formGroup = service.createOHLCVT5mFormGroup(sampleWithRequiredData);

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

    describe('getOHLCVT5m', () => {
      it('should return NewOHLCVT5m for default OHLCVT5m initial value', () => {
        const formGroup = service.createOHLCVT5mFormGroup(sampleWithNewData);

        const oHLCVT5m = service.getOHLCVT5m(formGroup) as any;

        expect(oHLCVT5m).toMatchObject(sampleWithNewData);
      });

      it('should return NewOHLCVT5m for empty OHLCVT5m initial value', () => {
        const formGroup = service.createOHLCVT5mFormGroup();

        const oHLCVT5m = service.getOHLCVT5m(formGroup) as any;

        expect(oHLCVT5m).toMatchObject({});
      });

      it('should return IOHLCVT5m', () => {
        const formGroup = service.createOHLCVT5mFormGroup(sampleWithRequiredData);

        const oHLCVT5m = service.getOHLCVT5m(formGroup) as any;

        expect(oHLCVT5m).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOHLCVT5m should not enable id FormControl', () => {
        const formGroup = service.createOHLCVT5mFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOHLCVT5m should disable id FormControl', () => {
        const formGroup = service.createOHLCVT5mFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
