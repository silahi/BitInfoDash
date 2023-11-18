import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOHLCVT15m, NewOHLCVT15m } from '../ohlcvt-15-m.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOHLCVT15m for edit and NewOHLCVT15mFormGroupInput for create.
 */
type OHLCVT15mFormGroupInput = IOHLCVT15m | PartialWithRequiredKeyOf<NewOHLCVT15m>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOHLCVT15m | NewOHLCVT15m> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

type OHLCVT15mFormRawValue = FormValueOf<IOHLCVT15m>;

type NewOHLCVT15mFormRawValue = FormValueOf<NewOHLCVT15m>;

type OHLCVT15mFormDefaults = Pick<NewOHLCVT15m, 'id' | 'timestamp'>;

type OHLCVT15mFormGroupContent = {
  id: FormControl<OHLCVT15mFormRawValue['id'] | NewOHLCVT15m['id']>;
  timestamp: FormControl<OHLCVT15mFormRawValue['timestamp']>;
  open: FormControl<OHLCVT15mFormRawValue['open']>;
  high: FormControl<OHLCVT15mFormRawValue['high']>;
  low: FormControl<OHLCVT15mFormRawValue['low']>;
  close: FormControl<OHLCVT15mFormRawValue['close']>;
  volume: FormControl<OHLCVT15mFormRawValue['volume']>;
  trades: FormControl<OHLCVT15mFormRawValue['trades']>;
};

export type OHLCVT15mFormGroup = FormGroup<OHLCVT15mFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OHLCVT15mFormService {
  createOHLCVT15mFormGroup(oHLCVT15m: OHLCVT15mFormGroupInput = { id: null }): OHLCVT15mFormGroup {
    const oHLCVT15mRawValue = this.convertOHLCVT15mToOHLCVT15mRawValue({
      ...this.getFormDefaults(),
      ...oHLCVT15m,
    });
    return new FormGroup<OHLCVT15mFormGroupContent>({
      id: new FormControl(
        { value: oHLCVT15mRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      timestamp: new FormControl(oHLCVT15mRawValue.timestamp),
      open: new FormControl(oHLCVT15mRawValue.open),
      high: new FormControl(oHLCVT15mRawValue.high),
      low: new FormControl(oHLCVT15mRawValue.low),
      close: new FormControl(oHLCVT15mRawValue.close),
      volume: new FormControl(oHLCVT15mRawValue.volume),
      trades: new FormControl(oHLCVT15mRawValue.trades),
    });
  }

  getOHLCVT15m(form: OHLCVT15mFormGroup): IOHLCVT15m | NewOHLCVT15m {
    return this.convertOHLCVT15mRawValueToOHLCVT15m(form.getRawValue() as OHLCVT15mFormRawValue | NewOHLCVT15mFormRawValue);
  }

  resetForm(form: OHLCVT15mFormGroup, oHLCVT15m: OHLCVT15mFormGroupInput): void {
    const oHLCVT15mRawValue = this.convertOHLCVT15mToOHLCVT15mRawValue({ ...this.getFormDefaults(), ...oHLCVT15m });
    form.reset(
      {
        ...oHLCVT15mRawValue,
        id: { value: oHLCVT15mRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OHLCVT15mFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timestamp: currentTime,
    };
  }

  private convertOHLCVT15mRawValueToOHLCVT15m(rawOHLCVT15m: OHLCVT15mFormRawValue | NewOHLCVT15mFormRawValue): IOHLCVT15m | NewOHLCVT15m {
    return {
      ...rawOHLCVT15m,
      timestamp: dayjs(rawOHLCVT15m.timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertOHLCVT15mToOHLCVT15mRawValue(
    oHLCVT15m: IOHLCVT15m | (Partial<NewOHLCVT15m> & OHLCVT15mFormDefaults),
  ): OHLCVT15mFormRawValue | PartialWithRequiredKeyOf<NewOHLCVT15mFormRawValue> {
    return {
      ...oHLCVT15m,
      timestamp: oHLCVT15m.timestamp ? oHLCVT15m.timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
