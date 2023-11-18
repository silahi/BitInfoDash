import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOHLCVT5m, NewOHLCVT5m } from '../ohlcvt-5-m.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOHLCVT5m for edit and NewOHLCVT5mFormGroupInput for create.
 */
type OHLCVT5mFormGroupInput = IOHLCVT5m | PartialWithRequiredKeyOf<NewOHLCVT5m>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOHLCVT5m | NewOHLCVT5m> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

type OHLCVT5mFormRawValue = FormValueOf<IOHLCVT5m>;

type NewOHLCVT5mFormRawValue = FormValueOf<NewOHLCVT5m>;

type OHLCVT5mFormDefaults = Pick<NewOHLCVT5m, 'id' | 'timestamp'>;

type OHLCVT5mFormGroupContent = {
  id: FormControl<OHLCVT5mFormRawValue['id'] | NewOHLCVT5m['id']>;
  timestamp: FormControl<OHLCVT5mFormRawValue['timestamp']>;
  open: FormControl<OHLCVT5mFormRawValue['open']>;
  high: FormControl<OHLCVT5mFormRawValue['high']>;
  low: FormControl<OHLCVT5mFormRawValue['low']>;
  close: FormControl<OHLCVT5mFormRawValue['close']>;
  volume: FormControl<OHLCVT5mFormRawValue['volume']>;
  trades: FormControl<OHLCVT5mFormRawValue['trades']>;
};

export type OHLCVT5mFormGroup = FormGroup<OHLCVT5mFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OHLCVT5mFormService {
  createOHLCVT5mFormGroup(oHLCVT5m: OHLCVT5mFormGroupInput = { id: null }): OHLCVT5mFormGroup {
    const oHLCVT5mRawValue = this.convertOHLCVT5mToOHLCVT5mRawValue({
      ...this.getFormDefaults(),
      ...oHLCVT5m,
    });
    return new FormGroup<OHLCVT5mFormGroupContent>({
      id: new FormControl(
        { value: oHLCVT5mRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      timestamp: new FormControl(oHLCVT5mRawValue.timestamp),
      open: new FormControl(oHLCVT5mRawValue.open),
      high: new FormControl(oHLCVT5mRawValue.high),
      low: new FormControl(oHLCVT5mRawValue.low),
      close: new FormControl(oHLCVT5mRawValue.close),
      volume: new FormControl(oHLCVT5mRawValue.volume),
      trades: new FormControl(oHLCVT5mRawValue.trades),
    });
  }

  getOHLCVT5m(form: OHLCVT5mFormGroup): IOHLCVT5m | NewOHLCVT5m {
    return this.convertOHLCVT5mRawValueToOHLCVT5m(form.getRawValue() as OHLCVT5mFormRawValue | NewOHLCVT5mFormRawValue);
  }

  resetForm(form: OHLCVT5mFormGroup, oHLCVT5m: OHLCVT5mFormGroupInput): void {
    const oHLCVT5mRawValue = this.convertOHLCVT5mToOHLCVT5mRawValue({ ...this.getFormDefaults(), ...oHLCVT5m });
    form.reset(
      {
        ...oHLCVT5mRawValue,
        id: { value: oHLCVT5mRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OHLCVT5mFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timestamp: currentTime,
    };
  }

  private convertOHLCVT5mRawValueToOHLCVT5m(rawOHLCVT5m: OHLCVT5mFormRawValue | NewOHLCVT5mFormRawValue): IOHLCVT5m | NewOHLCVT5m {
    return {
      ...rawOHLCVT5m,
      timestamp: dayjs(rawOHLCVT5m.timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertOHLCVT5mToOHLCVT5mRawValue(
    oHLCVT5m: IOHLCVT5m | (Partial<NewOHLCVT5m> & OHLCVT5mFormDefaults),
  ): OHLCVT5mFormRawValue | PartialWithRequiredKeyOf<NewOHLCVT5mFormRawValue> {
    return {
      ...oHLCVT5m,
      timestamp: oHLCVT5m.timestamp ? oHLCVT5m.timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
