import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOHLCVT12h, NewOHLCVT12h } from '../ohlcvt-12-h.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOHLCVT12h for edit and NewOHLCVT12hFormGroupInput for create.
 */
type OHLCVT12hFormGroupInput = IOHLCVT12h | PartialWithRequiredKeyOf<NewOHLCVT12h>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOHLCVT12h | NewOHLCVT12h> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

type OHLCVT12hFormRawValue = FormValueOf<IOHLCVT12h>;

type NewOHLCVT12hFormRawValue = FormValueOf<NewOHLCVT12h>;

type OHLCVT12hFormDefaults = Pick<NewOHLCVT12h, 'id' | 'timestamp'>;

type OHLCVT12hFormGroupContent = {
  id: FormControl<OHLCVT12hFormRawValue['id'] | NewOHLCVT12h['id']>;
  timestamp: FormControl<OHLCVT12hFormRawValue['timestamp']>;
  open: FormControl<OHLCVT12hFormRawValue['open']>;
  high: FormControl<OHLCVT12hFormRawValue['high']>;
  low: FormControl<OHLCVT12hFormRawValue['low']>;
  close: FormControl<OHLCVT12hFormRawValue['close']>;
  volume: FormControl<OHLCVT12hFormRawValue['volume']>;
  trades: FormControl<OHLCVT12hFormRawValue['trades']>;
};

export type OHLCVT12hFormGroup = FormGroup<OHLCVT12hFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OHLCVT12hFormService {
  createOHLCVT12hFormGroup(oHLCVT12h: OHLCVT12hFormGroupInput = { id: null }): OHLCVT12hFormGroup {
    const oHLCVT12hRawValue = this.convertOHLCVT12hToOHLCVT12hRawValue({
      ...this.getFormDefaults(),
      ...oHLCVT12h,
    });
    return new FormGroup<OHLCVT12hFormGroupContent>({
      id: new FormControl(
        { value: oHLCVT12hRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      timestamp: new FormControl(oHLCVT12hRawValue.timestamp),
      open: new FormControl(oHLCVT12hRawValue.open),
      high: new FormControl(oHLCVT12hRawValue.high),
      low: new FormControl(oHLCVT12hRawValue.low),
      close: new FormControl(oHLCVT12hRawValue.close),
      volume: new FormControl(oHLCVT12hRawValue.volume),
      trades: new FormControl(oHLCVT12hRawValue.trades),
    });
  }

  getOHLCVT12h(form: OHLCVT12hFormGroup): IOHLCVT12h | NewOHLCVT12h {
    return this.convertOHLCVT12hRawValueToOHLCVT12h(form.getRawValue() as OHLCVT12hFormRawValue | NewOHLCVT12hFormRawValue);
  }

  resetForm(form: OHLCVT12hFormGroup, oHLCVT12h: OHLCVT12hFormGroupInput): void {
    const oHLCVT12hRawValue = this.convertOHLCVT12hToOHLCVT12hRawValue({ ...this.getFormDefaults(), ...oHLCVT12h });
    form.reset(
      {
        ...oHLCVT12hRawValue,
        id: { value: oHLCVT12hRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OHLCVT12hFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timestamp: currentTime,
    };
  }

  private convertOHLCVT12hRawValueToOHLCVT12h(rawOHLCVT12h: OHLCVT12hFormRawValue | NewOHLCVT12hFormRawValue): IOHLCVT12h | NewOHLCVT12h {
    return {
      ...rawOHLCVT12h,
      timestamp: dayjs(rawOHLCVT12h.timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertOHLCVT12hToOHLCVT12hRawValue(
    oHLCVT12h: IOHLCVT12h | (Partial<NewOHLCVT12h> & OHLCVT12hFormDefaults),
  ): OHLCVT12hFormRawValue | PartialWithRequiredKeyOf<NewOHLCVT12hFormRawValue> {
    return {
      ...oHLCVT12h,
      timestamp: oHLCVT12h.timestamp ? oHLCVT12h.timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
