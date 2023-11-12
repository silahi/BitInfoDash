import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../blockchain-analytics.test-samples';

import { BlockchainAnalyticsFormService } from './blockchain-analytics-form.service';

describe('BlockchainAnalytics Form Service', () => {
  let service: BlockchainAnalyticsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockchainAnalyticsFormService);
  });

  describe('Service methods', () => {
    describe('createBlockchainAnalyticsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBlockchainAnalyticsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            transactionCount: expect.any(Object),
            averageTransactionFee: expect.any(Object),
            hashrateDistribution: expect.any(Object),
            timestamp: expect.any(Object),
            difficulty: expect.any(Object),
            networkHashrate: expect.any(Object),
          }),
        );
      });

      it('passing IBlockchainAnalytics should create a new form with FormGroup', () => {
        const formGroup = service.createBlockchainAnalyticsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            transactionCount: expect.any(Object),
            averageTransactionFee: expect.any(Object),
            hashrateDistribution: expect.any(Object),
            timestamp: expect.any(Object),
            difficulty: expect.any(Object),
            networkHashrate: expect.any(Object),
          }),
        );
      });
    });

    describe('getBlockchainAnalytics', () => {
      it('should return NewBlockchainAnalytics for default BlockchainAnalytics initial value', () => {
        const formGroup = service.createBlockchainAnalyticsFormGroup(sampleWithNewData);

        const blockchainAnalytics = service.getBlockchainAnalytics(formGroup) as any;

        expect(blockchainAnalytics).toMatchObject(sampleWithNewData);
      });

      it('should return NewBlockchainAnalytics for empty BlockchainAnalytics initial value', () => {
        const formGroup = service.createBlockchainAnalyticsFormGroup();

        const blockchainAnalytics = service.getBlockchainAnalytics(formGroup) as any;

        expect(blockchainAnalytics).toMatchObject({});
      });

      it('should return IBlockchainAnalytics', () => {
        const formGroup = service.createBlockchainAnalyticsFormGroup(sampleWithRequiredData);

        const blockchainAnalytics = service.getBlockchainAnalytics(formGroup) as any;

        expect(blockchainAnalytics).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBlockchainAnalytics should not enable id FormControl', () => {
        const formGroup = service.createBlockchainAnalyticsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBlockchainAnalytics should disable id FormControl', () => {
        const formGroup = service.createBlockchainAnalyticsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
