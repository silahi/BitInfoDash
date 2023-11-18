import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOHLCVT1h, NewOHLCVT1h } from '../ohlcvt-1-h.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOHLCVT1h for edit and NewOHLCVT1hFormGroupInput for create.
 */
type OHLCVT1hFormGroupInput = IOHLCVT1h | PartialWithRequiredKeyOf<NewOHLCVT1h>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOHLCVT1h | NewOHLCVT1h> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

type OHLCVT1hFormRawValue = FormValueOf<IOHLCVT1h>;

type NewOHLCVT1hFormRawValue = FormValueOf<NewOHLCVT1h>;

type OHLCVT1hFormDefaults = Pick<NewOHLCVT1h, 'id' | 'timestamp'>;

type OHLCVT1hFormGroupContent = {
  id: FormControl<OHLCVT1hFormRawValue['id'] | NewOHLCVT1h['id']>;
  timestamp: FormControl<OHLCVT1hFormRawValue['timestamp']>;
  open: FormControl<OHLCVT1hFormRawValue['open']>;
  high: FormControl<OHLCVT1hFormRawValue['high']>;
  low: FormControl<OHLCVT1hFormRawValue['low']>;
  close: FormControl<OHLCVT1hFormRawValue['close']>;
  volume: FormControl<OHLCVT1hFormRawValue['volume']>;
  trades: FormControl<OHLCVT1hFormRawValue['trades']>;
};

export type OHLCVT1hFormGroup = FormGroup<OHLCVT1hFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OHLCVT1hFormService {
  createOHLCVT1hFormGroup(oHLCVT1h: OHLCVT1hFormGroupInput = { id: null }): OHLCVT1hFormGroup {
    const oHLCVT1hRawValue = this.convertOHLCVT1hToOHLCVT1hRawValue({
      ...this.getFormDefaults(),
      ...oHLCVT1h,
    });
    return new FormGroup<OHLCVT1hFormGroupContent>({
      id: new FormControl(
        { value: oHLCVT1hRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      timestamp: new FormControl(oHLCVT1hRawValue.timestamp),
      open: new FormControl(oHLCVT1hRawValue.open),
      high: new FormControl(oHLCVT1hRawValue.high),
      low: new FormControl(oHLCVT1hRawValue.low),
      close: new FormControl(oHLCVT1hRawValue.close),
      volume: new FormControl(oHLCVT1hRawValue.volume),
      trades: new FormControl(oHLCVT1hRawValue.trades),
    });
  }

  getOHLCVT1h(form: OHLCVT1hFormGroup): IOHLCVT1h | NewOHLCVT1h {
    return this.convertOHLCVT1hRawValueToOHLCVT1h(form.getRawValue() as OHLCVT1hFormRawValue | NewOHLCVT1hFormRawValue);
  }

  resetForm(form: OHLCVT1hFormGroup, oHLCVT1h: OHLCVT1hFormGroupInput): void {
    const oHLCVT1hRawValue = this.convertOHLCVT1hToOHLCVT1hRawValue({ ...this.getFormDefaults(), ...oHLCVT1h });
    form.reset(
      {
        ...oHLCVT1hRawValue,
        id: { value: oHLCVT1hRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OHLCVT1hFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timestamp: currentTime,
    };
  }

  private convertOHLCVT1hRawValueToOHLCVT1h(rawOHLCVT1h: OHLCVT1hFormRawValue | NewOHLCVT1hFormRawValue): IOHLCVT1h | NewOHLCVT1h {
    return {
      ...rawOHLCVT1h,
      timestamp: dayjs(rawOHLCVT1h.timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertOHLCVT1hToOHLCVT1hRawValue(
    oHLCVT1h: IOHLCVT1h | (Partial<NewOHLCVT1h> & OHLCVT1hFormDefaults),
  ): OHLCVT1hFormRawValue | PartialWithRequiredKeyOf<NewOHLCVT1hFormRawValue> {
    return {
      ...oHLCVT1h,
      timestamp: oHLCVT1h.timestamp ? oHLCVT1h.timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
