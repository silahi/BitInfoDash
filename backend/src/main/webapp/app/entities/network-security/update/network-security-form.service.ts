import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { INetworkSecurity, NewNetworkSecurity } from '../network-security.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INetworkSecurity for edit and NewNetworkSecurityFormGroupInput for create.
 */
type NetworkSecurityFormGroupInput = INetworkSecurity | PartialWithRequiredKeyOf<NewNetworkSecurity>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends INetworkSecurity | NewNetworkSecurity> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

type NetworkSecurityFormRawValue = FormValueOf<INetworkSecurity>;

type NewNetworkSecurityFormRawValue = FormValueOf<NewNetworkSecurity>;

type NetworkSecurityFormDefaults = Pick<NewNetworkSecurity, 'id' | 'timestamp'>;

type NetworkSecurityFormGroupContent = {
  id: FormControl<NetworkSecurityFormRawValue['id'] | NewNetworkSecurity['id']>;
  alertType: FormControl<NetworkSecurityFormRawValue['alertType']>;
  description: FormControl<NetworkSecurityFormRawValue['description']>;
  timestamp: FormControl<NetworkSecurityFormRawValue['timestamp']>;
  severity: FormControl<NetworkSecurityFormRawValue['severity']>;
  resolution: FormControl<NetworkSecurityFormRawValue['resolution']>;
};

export type NetworkSecurityFormGroup = FormGroup<NetworkSecurityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NetworkSecurityFormService {
  createNetworkSecurityFormGroup(networkSecurity: NetworkSecurityFormGroupInput = { id: null }): NetworkSecurityFormGroup {
    const networkSecurityRawValue = this.convertNetworkSecurityToNetworkSecurityRawValue({
      ...this.getFormDefaults(),
      ...networkSecurity,
    });
    return new FormGroup<NetworkSecurityFormGroupContent>({
      id: new FormControl(
        { value: networkSecurityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      alertType: new FormControl(networkSecurityRawValue.alertType),
      description: new FormControl(networkSecurityRawValue.description),
      timestamp: new FormControl(networkSecurityRawValue.timestamp),
      severity: new FormControl(networkSecurityRawValue.severity),
      resolution: new FormControl(networkSecurityRawValue.resolution),
    });
  }

  getNetworkSecurity(form: NetworkSecurityFormGroup): INetworkSecurity | NewNetworkSecurity {
    return this.convertNetworkSecurityRawValueToNetworkSecurity(
      form.getRawValue() as NetworkSecurityFormRawValue | NewNetworkSecurityFormRawValue,
    );
  }

  resetForm(form: NetworkSecurityFormGroup, networkSecurity: NetworkSecurityFormGroupInput): void {
    const networkSecurityRawValue = this.convertNetworkSecurityToNetworkSecurityRawValue({ ...this.getFormDefaults(), ...networkSecurity });
    form.reset(
      {
        ...networkSecurityRawValue,
        id: { value: networkSecurityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): NetworkSecurityFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timestamp: currentTime,
    };
  }

  private convertNetworkSecurityRawValueToNetworkSecurity(
    rawNetworkSecurity: NetworkSecurityFormRawValue | NewNetworkSecurityFormRawValue,
  ): INetworkSecurity | NewNetworkSecurity {
    return {
      ...rawNetworkSecurity,
      timestamp: dayjs(rawNetworkSecurity.timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertNetworkSecurityToNetworkSecurityRawValue(
    networkSecurity: INetworkSecurity | (Partial<NewNetworkSecurity> & NetworkSecurityFormDefaults),
  ): NetworkSecurityFormRawValue | PartialWithRequiredKeyOf<NewNetworkSecurityFormRawValue> {
    return {
      ...networkSecurity,
      timestamp: networkSecurity.timestamp ? networkSecurity.timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
