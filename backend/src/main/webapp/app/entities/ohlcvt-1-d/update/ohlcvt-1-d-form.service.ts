import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOHLCVT1d, NewOHLCVT1d } from '../ohlcvt-1-d.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOHLCVT1d for edit and NewOHLCVT1dFormGroupInput for create.
 */
type OHLCVT1dFormGroupInput = IOHLCVT1d | PartialWithRequiredKeyOf<NewOHLCVT1d>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOHLCVT1d | NewOHLCVT1d> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

type OHLCVT1dFormRawValue = FormValueOf<IOHLCVT1d>;

type NewOHLCVT1dFormRawValue = FormValueOf<NewOHLCVT1d>;

type OHLCVT1dFormDefaults = Pick<NewOHLCVT1d, 'id' | 'timestamp'>;

type OHLCVT1dFormGroupContent = {
  id: FormControl<OHLCVT1dFormRawValue['id'] | NewOHLCVT1d['id']>;
  timestamp: FormControl<OHLCVT1dFormRawValue['timestamp']>;
  open: FormControl<OHLCVT1dFormRawValue['open']>;
  high: FormControl<OHLCVT1dFormRawValue['high']>;
  low: FormControl<OHLCVT1dFormRawValue['low']>;
  close: FormControl<OHLCVT1dFormRawValue['close']>;
  volume: FormControl<OHLCVT1dFormRawValue['volume']>;
  trades: FormControl<OHLCVT1dFormRawValue['trades']>;
};

export type OHLCVT1dFormGroup = FormGroup<OHLCVT1dFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OHLCVT1dFormService {
  createOHLCVT1dFormGroup(oHLCVT1d: OHLCVT1dFormGroupInput = { id: null }): OHLCVT1dFormGroup {
    const oHLCVT1dRawValue = this.convertOHLCVT1dToOHLCVT1dRawValue({
      ...this.getFormDefaults(),
      ...oHLCVT1d,
    });
    return new FormGroup<OHLCVT1dFormGroupContent>({
      id: new FormControl(
        { value: oHLCVT1dRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      timestamp: new FormControl(oHLCVT1dRawValue.timestamp),
      open: new FormControl(oHLCVT1dRawValue.open),
      high: new FormControl(oHLCVT1dRawValue.high),
      low: new FormControl(oHLCVT1dRawValue.low),
      close: new FormControl(oHLCVT1dRawValue.close),
      volume: new FormControl(oHLCVT1dRawValue.volume),
      trades: new FormControl(oHLCVT1dRawValue.trades),
    });
  }

  getOHLCVT1d(form: OHLCVT1dFormGroup): IOHLCVT1d | NewOHLCVT1d {
    return this.convertOHLCVT1dRawValueToOHLCVT1d(form.getRawValue() as OHLCVT1dFormRawValue | NewOHLCVT1dFormRawValue);
  }

  resetForm(form: OHLCVT1dFormGroup, oHLCVT1d: OHLCVT1dFormGroupInput): void {
    const oHLCVT1dRawValue = this.convertOHLCVT1dToOHLCVT1dRawValue({ ...this.getFormDefaults(), ...oHLCVT1d });
    form.reset(
      {
        ...oHLCVT1dRawValue,
        id: { value: oHLCVT1dRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OHLCVT1dFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timestamp: currentTime,
    };
  }

  private convertOHLCVT1dRawValueToOHLCVT1d(rawOHLCVT1d: OHLCVT1dFormRawValue | NewOHLCVT1dFormRawValue): IOHLCVT1d | NewOHLCVT1d {
    return {
      ...rawOHLCVT1d,
      timestamp: dayjs(rawOHLCVT1d.timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertOHLCVT1dToOHLCVT1dRawValue(
    oHLCVT1d: IOHLCVT1d | (Partial<NewOHLCVT1d> & OHLCVT1dFormDefaults),
  ): OHLCVT1dFormRawValue | PartialWithRequiredKeyOf<NewOHLCVT1dFormRawValue> {
    return {
      ...oHLCVT1d,
      timestamp: oHLCVT1d.timestamp ? oHLCVT1d.timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
