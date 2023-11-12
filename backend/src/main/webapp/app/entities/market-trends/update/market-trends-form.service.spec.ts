import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../market-trends.test-samples';

import { MarketTrendsFormService } from './market-trends-form.service';

describe('MarketTrends Form Service', () => {
  let service: MarketTrendsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketTrendsFormService);
  });

  describe('Service methods', () => {
    describe('createMarketTrendsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMarketTrendsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            trendName: expect.any(Object),
            indicatorValue: expect.any(Object),
            timestamp: expect.any(Object),
            trendType: expect.any(Object),
          }),
        );
      });

      it('passing IMarketTrends should create a new form with FormGroup', () => {
        const formGroup = service.createMarketTrendsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            trendName: expect.any(Object),
            indicatorValue: expect.any(Object),
            timestamp: expect.any(Object),
            trendType: expect.any(Object),
          }),
        );
      });
    });

    describe('getMarketTrends', () => {
      it('should return NewMarketTrends for default MarketTrends initial value', () => {
        const formGroup = service.createMarketTrendsFormGroup(sampleWithNewData);

        const marketTrends = service.getMarketTrends(formGroup) as any;

        expect(marketTrends).toMatchObject(sampleWithNewData);
      });

      it('should return NewMarketTrends for empty MarketTrends initial value', () => {
        const formGroup = service.createMarketTrendsFormGroup();

        const marketTrends = service.getMarketTrends(formGroup) as any;

        expect(marketTrends).toMatchObject({});
      });

      it('should return IMarketTrends', () => {
        const formGroup = service.createMarketTrendsFormGroup(sampleWithRequiredData);

        const marketTrends = service.getMarketTrends(formGroup) as any;

        expect(marketTrends).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMarketTrends should not enable id FormControl', () => {
        const formGroup = service.createMarketTrendsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMarketTrends should disable id FormControl', () => {
        const formGroup = service.createMarketTrendsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
