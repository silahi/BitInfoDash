import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../bitcoin-overview.test-samples';

import { BitcoinOverviewFormService } from './bitcoin-overview-form.service';

describe('BitcoinOverview Form Service', () => {
  let service: BitcoinOverviewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitcoinOverviewFormService);
  });

  describe('Service methods', () => {
    describe('createBitcoinOverviewFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBitcoinOverviewFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bitcoinPrice: expect.any(Object),
            marketCap: expect.any(Object),
            exchangeVolume: expect.any(Object),
            recentVariation: expect.any(Object),
            timestamp: expect.any(Object),
            currency: expect.any(Object),
          }),
        );
      });

      it('passing IBitcoinOverview should create a new form with FormGroup', () => {
        const formGroup = service.createBitcoinOverviewFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bitcoinPrice: expect.any(Object),
            marketCap: expect.any(Object),
            exchangeVolume: expect.any(Object),
            recentVariation: expect.any(Object),
            timestamp: expect.any(Object),
            currency: expect.any(Object),
          }),
        );
      });
    });

    describe('getBitcoinOverview', () => {
      it('should return NewBitcoinOverview for default BitcoinOverview initial value', () => {
        const formGroup = service.createBitcoinOverviewFormGroup(sampleWithNewData);

        const bitcoinOverview = service.getBitcoinOverview(formGroup) as any;

        expect(bitcoinOverview).toMatchObject(sampleWithNewData);
      });

      it('should return NewBitcoinOverview for empty BitcoinOverview initial value', () => {
        const formGroup = service.createBitcoinOverviewFormGroup();

        const bitcoinOverview = service.getBitcoinOverview(formGroup) as any;

        expect(bitcoinOverview).toMatchObject({});
      });

      it('should return IBitcoinOverview', () => {
        const formGroup = service.createBitcoinOverviewFormGroup(sampleWithRequiredData);

        const bitcoinOverview = service.getBitcoinOverview(formGroup) as any;

        expect(bitcoinOverview).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBitcoinOverview should not enable id FormControl', () => {
        const formGroup = service.createBitcoinOverviewFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBitcoinOverview should disable id FormControl', () => {
        const formGroup = service.createBitcoinOverviewFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
