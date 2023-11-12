import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITransactions, NewTransactions } from '../transactions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITransactions for edit and NewTransactionsFormGroupInput for create.
 */
type TransactionsFormGroupInput = ITransactions | PartialWithRequiredKeyOf<NewTransactions>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITransactions | NewTransactions> = Omit<T, 'transactionDate'> & {
  transactionDate?: string | null;
};

type TransactionsFormRawValue = FormValueOf<ITransactions>;

type NewTransactionsFormRawValue = FormValueOf<NewTransactions>;

type TransactionsFormDefaults = Pick<NewTransactions, 'id' | 'transactionDate'>;

type TransactionsFormGroupContent = {
  id: FormControl<TransactionsFormRawValue['id'] | NewTransactions['id']>;
  amount: FormControl<TransactionsFormRawValue['amount']>;
  transactionDate: FormControl<TransactionsFormRawValue['transactionDate']>;
  senderAddress: FormControl<TransactionsFormRawValue['senderAddress']>;
  recipientAddress: FormControl<TransactionsFormRawValue['recipientAddress']>;
  bitcoinAddress: FormControl<TransactionsFormRawValue['bitcoinAddress']>;
};

export type TransactionsFormGroup = FormGroup<TransactionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TransactionsFormService {
  createTransactionsFormGroup(transactions: TransactionsFormGroupInput = { id: null }): TransactionsFormGroup {
    const transactionsRawValue = this.convertTransactionsToTransactionsRawValue({
      ...this.getFormDefaults(),
      ...transactions,
    });
    return new FormGroup<TransactionsFormGroupContent>({
      id: new FormControl(
        { value: transactionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      amount: new FormControl(transactionsRawValue.amount),
      transactionDate: new FormControl(transactionsRawValue.transactionDate),
      senderAddress: new FormControl(transactionsRawValue.senderAddress),
      recipientAddress: new FormControl(transactionsRawValue.recipientAddress),
      bitcoinAddress: new FormControl(transactionsRawValue.bitcoinAddress),
    });
  }

  getTransactions(form: TransactionsFormGroup): ITransactions | NewTransactions {
    return this.convertTransactionsRawValueToTransactions(form.getRawValue() as TransactionsFormRawValue | NewTransactionsFormRawValue);
  }

  resetForm(form: TransactionsFormGroup, transactions: TransactionsFormGroupInput): void {
    const transactionsRawValue = this.convertTransactionsToTransactionsRawValue({ ...this.getFormDefaults(), ...transactions });
    form.reset(
      {
        ...transactionsRawValue,
        id: { value: transactionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TransactionsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      transactionDate: currentTime,
    };
  }

  private convertTransactionsRawValueToTransactions(
    rawTransactions: TransactionsFormRawValue | NewTransactionsFormRawValue,
  ): ITransactions | NewTransactions {
    return {
      ...rawTransactions,
      transactionDate: dayjs(rawTransactions.transactionDate, DATE_TIME_FORMAT),
    };
  }

  private convertTransactionsToTransactionsRawValue(
    transactions: ITransactions | (Partial<NewTransactions> & TransactionsFormDefaults),
  ): TransactionsFormRawValue | PartialWithRequiredKeyOf<NewTransactionsFormRawValue> {
    return {
      ...transactions,
      transactionDate: transactions.transactionDate ? transactions.transactionDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
