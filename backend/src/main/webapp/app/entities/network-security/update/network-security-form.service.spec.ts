import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../network-security.test-samples';

import { NetworkSecurityFormService } from './network-security-form.service';

describe('NetworkSecurity Form Service', () => {
  let service: NetworkSecurityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkSecurityFormService);
  });

  describe('Service methods', () => {
    describe('createNetworkSecurityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNetworkSecurityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            alertType: expect.any(Object),
            description: expect.any(Object),
            timestamp: expect.any(Object),
            severity: expect.any(Object),
            resolution: expect.any(Object),
          }),
        );
      });

      it('passing INetworkSecurity should create a new form with FormGroup', () => {
        const formGroup = service.createNetworkSecurityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            alertType: expect.any(Object),
            description: expect.any(Object),
            timestamp: expect.any(Object),
            severity: expect.any(Object),
            resolution: expect.any(Object),
          }),
        );
      });
    });

    describe('getNetworkSecurity', () => {
      it('should return NewNetworkSecurity for default NetworkSecurity initial value', () => {
        const formGroup = service.createNetworkSecurityFormGroup(sampleWithNewData);

        const networkSecurity = service.getNetworkSecurity(formGroup) as any;

        expect(networkSecurity).toMatchObject(sampleWithNewData);
      });

      it('should return NewNetworkSecurity for empty NetworkSecurity initial value', () => {
        const formGroup = service.createNetworkSecurityFormGroup();

        const networkSecurity = service.getNetworkSecurity(formGroup) as any;

        expect(networkSecurity).toMatchObject({});
      });

      it('should return INetworkSecurity', () => {
        const formGroup = service.createNetworkSecurityFormGroup(sampleWithRequiredData);

        const networkSecurity = service.getNetworkSecurity(formGroup) as any;

        expect(networkSecurity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INetworkSecurity should not enable id FormControl', () => {
        const formGroup = service.createNetworkSecurityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNetworkSecurity should disable id FormControl', () => {
        const formGroup = service.createNetworkSecurityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
