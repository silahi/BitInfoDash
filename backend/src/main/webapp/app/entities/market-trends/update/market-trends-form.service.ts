import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMarketTrends, NewMarketTrends } from '../market-trends.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMarketTrends for edit and NewMarketTrendsFormGroupInput for create.
 */
type MarketTrendsFormGroupInput = IMarketTrends | PartialWithRequiredKeyOf<NewMarketTrends>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IMarketTrends | NewMarketTrends> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

type MarketTrendsFormRawValue = FormValueOf<IMarketTrends>;

type NewMarketTrendsFormRawValue = FormValueOf<NewMarketTrends>;

type MarketTrendsFormDefaults = Pick<NewMarketTrends, 'id' | 'timestamp'>;

type MarketTrendsFormGroupContent = {
  id: FormControl<MarketTrendsFormRawValue['id'] | NewMarketTrends['id']>;
  trendName: FormControl<MarketTrendsFormRawValue['trendName']>;
  indicatorValue: FormControl<MarketTrendsFormRawValue['indicatorValue']>;
  timestamp: FormControl<MarketTrendsFormRawValue['timestamp']>;
  trendType: FormControl<MarketTrendsFormRawValue['trendType']>;
};

export type MarketTrendsFormGroup = FormGroup<MarketTrendsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MarketTrendsFormService {
  createMarketTrendsFormGroup(marketTrends: MarketTrendsFormGroupInput = { id: null }): MarketTrendsFormGroup {
    const marketTrendsRawValue = this.convertMarketTrendsToMarketTrendsRawValue({
      ...this.getFormDefaults(),
      ...marketTrends,
    });
    return new FormGroup<MarketTrendsFormGroupContent>({
      id: new FormControl(
        { value: marketTrendsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      trendName: new FormControl(marketTrendsRawValue.trendName),
      indicatorValue: new FormControl(marketTrendsRawValue.indicatorValue),
      timestamp: new FormControl(marketTrendsRawValue.timestamp),
      trendType: new FormControl(marketTrendsRawValue.trendType),
    });
  }

  getMarketTrends(form: MarketTrendsFormGroup): IMarketTrends | NewMarketTrends {
    return this.convertMarketTrendsRawValueToMarketTrends(form.getRawValue() as MarketTrendsFormRawValue | NewMarketTrendsFormRawValue);
  }

  resetForm(form: MarketTrendsFormGroup, marketTrends: MarketTrendsFormGroupInput): void {
    const marketTrendsRawValue = this.convertMarketTrendsToMarketTrendsRawValue({ ...this.getFormDefaults(), ...marketTrends });
    form.reset(
      {
        ...marketTrendsRawValue,
        id: { value: marketTrendsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): MarketTrendsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timestamp: currentTime,
    };
  }

  private convertMarketTrendsRawValueToMarketTrends(
    rawMarketTrends: MarketTrendsFormRawValue | NewMarketTrendsFormRawValue,
  ): IMarketTrends | NewMarketTrends {
    return {
      ...rawMarketTrends,
      timestamp: dayjs(rawMarketTrends.timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertMarketTrendsToMarketTrendsRawValue(
    marketTrends: IMarketTrends | (Partial<NewMarketTrends> & MarketTrendsFormDefaults),
  ): MarketTrendsFormRawValue | PartialWithRequiredKeyOf<NewMarketTrendsFormRawValue> {
    return {
      ...marketTrends,
      timestamp: marketTrends.timestamp ? marketTrends.timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
