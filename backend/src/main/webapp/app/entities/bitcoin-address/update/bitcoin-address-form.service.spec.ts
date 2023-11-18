import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../bitcoin-address.test-samples';

import { BitcoinAddressFormService } from './bitcoin-address-form.service';

describe('BitcoinAddress Form Service', () => {
  let service: BitcoinAddressFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitcoinAddressFormService);
  });

  describe('Service methods', () => {
    describe('createBitcoinAddressFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBitcoinAddressFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            address: expect.any(Object),
            balance: expect.any(Object),
            label: expect.any(Object),
            sent: expect.any(Object),
            received: expect.any(Object),
          }),
        );
      });

      it('passing IBitcoinAddress should create a new form with FormGroup', () => {
        const formGroup = service.createBitcoinAddressFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            address: expect.any(Object),
            balance: expect.any(Object),
            label: expect.any(Object),
            sent: expect.any(Object),
            received: expect.any(Object),
          }),
        );
      });
    });

    describe('getBitcoinAddress', () => {
      it('should return NewBitcoinAddress for default BitcoinAddress initial value', () => {
        const formGroup = service.createBitcoinAddressFormGroup(sampleWithNewData);

        const bitcoinAddress = service.getBitcoinAddress(formGroup) as any;

        expect(bitcoinAddress).toMatchObject(sampleWithNewData);
      });

      it('should return NewBitcoinAddress for empty BitcoinAddress initial value', () => {
        const formGroup = service.createBitcoinAddressFormGroup();

        const bitcoinAddress = service.getBitcoinAddress(formGroup) as any;

        expect(bitcoinAddress).toMatchObject({});
      });

      it('should return IBitcoinAddress', () => {
        const formGroup = service.createBitcoinAddressFormGroup(sampleWithRequiredData);

        const bitcoinAddress = service.getBitcoinAddress(formGroup) as any;

        expect(bitcoinAddress).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBitcoinAddress should not enable id FormControl', () => {
        const formGroup = service.createBitcoinAddressFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBitcoinAddress should disable id FormControl', () => {
        const formGroup = service.createBitcoinAddressFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
