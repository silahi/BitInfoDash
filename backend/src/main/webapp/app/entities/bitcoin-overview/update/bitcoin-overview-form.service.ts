import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IBitcoinOverview, NewBitcoinOverview } from '../bitcoin-overview.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBitcoinOverview for edit and NewBitcoinOverviewFormGroupInput for create.
 */
type BitcoinOverviewFormGroupInput = IBitcoinOverview | PartialWithRequiredKeyOf<NewBitcoinOverview>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IBitcoinOverview | NewBitcoinOverview> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

type BitcoinOverviewFormRawValue = FormValueOf<IBitcoinOverview>;

type NewBitcoinOverviewFormRawValue = FormValueOf<NewBitcoinOverview>;

type BitcoinOverviewFormDefaults = Pick<NewBitcoinOverview, 'id' | 'timestamp'>;

type BitcoinOverviewFormGroupContent = {
  id: FormControl<BitcoinOverviewFormRawValue['id'] | NewBitcoinOverview['id']>;
  bitcoinPrice: FormControl<BitcoinOverviewFormRawValue['bitcoinPrice']>;
  marketCap: FormControl<BitcoinOverviewFormRawValue['marketCap']>;
  exchangeVolume: FormControl<BitcoinOverviewFormRawValue['exchangeVolume']>;
  recentVariation: FormControl<BitcoinOverviewFormRawValue['recentVariation']>;
  timestamp: FormControl<BitcoinOverviewFormRawValue['timestamp']>;
  currency: FormControl<BitcoinOverviewFormRawValue['currency']>;
};

export type BitcoinOverviewFormGroup = FormGroup<BitcoinOverviewFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BitcoinOverviewFormService {
  createBitcoinOverviewFormGroup(bitcoinOverview: BitcoinOverviewFormGroupInput = { id: null }): BitcoinOverviewFormGroup {
    const bitcoinOverviewRawValue = this.convertBitcoinOverviewToBitcoinOverviewRawValue({
      ...this.getFormDefaults(),
      ...bitcoinOverview,
    });
    return new FormGroup<BitcoinOverviewFormGroupContent>({
      id: new FormControl(
        { value: bitcoinOverviewRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      bitcoinPrice: new FormControl(bitcoinOverviewRawValue.bitcoinPrice),
      marketCap: new FormControl(bitcoinOverviewRawValue.marketCap),
      exchangeVolume: new FormControl(bitcoinOverviewRawValue.exchangeVolume),
      recentVariation: new FormControl(bitcoinOverviewRawValue.recentVariation),
      timestamp: new FormControl(bitcoinOverviewRawValue.timestamp),
      currency: new FormControl(bitcoinOverviewRawValue.currency),
    });
  }

  getBitcoinOverview(form: BitcoinOverviewFormGroup): IBitcoinOverview | NewBitcoinOverview {
    return this.convertBitcoinOverviewRawValueToBitcoinOverview(
      form.getRawValue() as BitcoinOverviewFormRawValue | NewBitcoinOverviewFormRawValue,
    );
  }

  resetForm(form: BitcoinOverviewFormGroup, bitcoinOverview: BitcoinOverviewFormGroupInput): void {
    const bitcoinOverviewRawValue = this.convertBitcoinOverviewToBitcoinOverviewRawValue({ ...this.getFormDefaults(), ...bitcoinOverview });
    form.reset(
      {
        ...bitcoinOverviewRawValue,
        id: { value: bitcoinOverviewRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): BitcoinOverviewFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timestamp: currentTime,
    };
  }

  private convertBitcoinOverviewRawValueToBitcoinOverview(
    rawBitcoinOverview: BitcoinOverviewFormRawValue | NewBitcoinOverviewFormRawValue,
  ): IBitcoinOverview | NewBitcoinOverview {
    return {
      ...rawBitcoinOverview,
      timestamp: dayjs(rawBitcoinOverview.timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertBitcoinOverviewToBitcoinOverviewRawValue(
    bitcoinOverview: IBitcoinOverview | (Partial<NewBitcoinOverview> & BitcoinOverviewFormDefaults),
  ): BitcoinOverviewFormRawValue | PartialWithRequiredKeyOf<NewBitcoinOverviewFormRawValue> {
    return {
      ...bitcoinOverview,
      timestamp: bitcoinOverview.timestamp ? bitcoinOverview.timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
