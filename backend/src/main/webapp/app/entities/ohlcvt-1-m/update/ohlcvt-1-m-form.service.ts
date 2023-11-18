import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOHLCVT1m, NewOHLCVT1m } from '../ohlcvt-1-m.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOHLCVT1m for edit and NewOHLCVT1mFormGroupInput for create.
 */
type OHLCVT1mFormGroupInput = IOHLCVT1m | PartialWithRequiredKeyOf<NewOHLCVT1m>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOHLCVT1m | NewOHLCVT1m> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

type OHLCVT1mFormRawValue = FormValueOf<IOHLCVT1m>;

type NewOHLCVT1mFormRawValue = FormValueOf<NewOHLCVT1m>;

type OHLCVT1mFormDefaults = Pick<NewOHLCVT1m, 'id' | 'timestamp'>;

type OHLCVT1mFormGroupContent = {
  id: FormControl<OHLCVT1mFormRawValue['id'] | NewOHLCVT1m['id']>;
  timestamp: FormControl<OHLCVT1mFormRawValue['timestamp']>;
  open: FormControl<OHLCVT1mFormRawValue['open']>;
  high: FormControl<OHLCVT1mFormRawValue['high']>;
  low: FormControl<OHLCVT1mFormRawValue['low']>;
  close: FormControl<OHLCVT1mFormRawValue['close']>;
  volume: FormControl<OHLCVT1mFormRawValue['volume']>;
  trades: FormControl<OHLCVT1mFormRawValue['trades']>;
};

export type OHLCVT1mFormGroup = FormGroup<OHLCVT1mFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OHLCVT1mFormService {
  createOHLCVT1mFormGroup(oHLCVT1m: OHLCVT1mFormGroupInput = { id: null }): OHLCVT1mFormGroup {
    const oHLCVT1mRawValue = this.convertOHLCVT1mToOHLCVT1mRawValue({
      ...this.getFormDefaults(),
      ...oHLCVT1m,
    });
    return new FormGroup<OHLCVT1mFormGroupContent>({
      id: new FormControl(
        { value: oHLCVT1mRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      timestamp: new FormControl(oHLCVT1mRawValue.timestamp),
      open: new FormControl(oHLCVT1mRawValue.open),
      high: new FormControl(oHLCVT1mRawValue.high),
      low: new FormControl(oHLCVT1mRawValue.low),
      close: new FormControl(oHLCVT1mRawValue.close),
      volume: new FormControl(oHLCVT1mRawValue.volume),
      trades: new FormControl(oHLCVT1mRawValue.trades),
    });
  }

  getOHLCVT1m(form: OHLCVT1mFormGroup): IOHLCVT1m | NewOHLCVT1m {
    return this.convertOHLCVT1mRawValueToOHLCVT1m(form.getRawValue() as OHLCVT1mFormRawValue | NewOHLCVT1mFormRawValue);
  }

  resetForm(form: OHLCVT1mFormGroup, oHLCVT1m: OHLCVT1mFormGroupInput): void {
    const oHLCVT1mRawValue = this.convertOHLCVT1mToOHLCVT1mRawValue({ ...this.getFormDefaults(), ...oHLCVT1m });
    form.reset(
      {
        ...oHLCVT1mRawValue,
        id: { value: oHLCVT1mRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OHLCVT1mFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timestamp: currentTime,
    };
  }

  private convertOHLCVT1mRawValueToOHLCVT1m(rawOHLCVT1m: OHLCVT1mFormRawValue | NewOHLCVT1mFormRawValue): IOHLCVT1m | NewOHLCVT1m {
    return {
      ...rawOHLCVT1m,
      timestamp: dayjs(rawOHLCVT1m.timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertOHLCVT1mToOHLCVT1mRawValue(
    oHLCVT1m: IOHLCVT1m | (Partial<NewOHLCVT1m> & OHLCVT1mFormDefaults),
  ): OHLCVT1mFormRawValue | PartialWithRequiredKeyOf<NewOHLCVT1mFormRawValue> {
    return {
      ...oHLCVT1m,
      timestamp: oHLCVT1m.timestamp ? oHLCVT1m.timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
