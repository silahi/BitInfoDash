import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBitcoinAddress, NewBitcoinAddress } from '../bitcoin-address.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBitcoinAddress for edit and NewBitcoinAddressFormGroupInput for create.
 */
type BitcoinAddressFormGroupInput = IBitcoinAddress | PartialWithRequiredKeyOf<NewBitcoinAddress>;

type BitcoinAddressFormDefaults = Pick<NewBitcoinAddress, 'id'>;

type BitcoinAddressFormGroupContent = {
  id: FormControl<IBitcoinAddress['id'] | NewBitcoinAddress['id']>;
  address: FormControl<IBitcoinAddress['address']>;
  balance: FormControl<IBitcoinAddress['balance']>;
  label: FormControl<IBitcoinAddress['label']>;
};

export type BitcoinAddressFormGroup = FormGroup<BitcoinAddressFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BitcoinAddressFormService {
  createBitcoinAddressFormGroup(bitcoinAddress: BitcoinAddressFormGroupInput = { id: null }): BitcoinAddressFormGroup {
    const bitcoinAddressRawValue = {
      ...this.getFormDefaults(),
      ...bitcoinAddress,
    };
    return new FormGroup<BitcoinAddressFormGroupContent>({
      id: new FormControl(
        { value: bitcoinAddressRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      address: new FormControl(bitcoinAddressRawValue.address),
      balance: new FormControl(bitcoinAddressRawValue.balance),
      label: new FormControl(bitcoinAddressRawValue.label),
    });
  }

  getBitcoinAddress(form: BitcoinAddressFormGroup): IBitcoinAddress | NewBitcoinAddress {
    return form.getRawValue() as IBitcoinAddress | NewBitcoinAddress;
  }

  resetForm(form: BitcoinAddressFormGroup, bitcoinAddress: BitcoinAddressFormGroupInput): void {
    const bitcoinAddressRawValue = { ...this.getFormDefaults(), ...bitcoinAddress };
    form.reset(
      {
        ...bitcoinAddressRawValue,
        id: { value: bitcoinAddressRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): BitcoinAddressFormDefaults {
    return {
      id: null,
    };
  }
}
