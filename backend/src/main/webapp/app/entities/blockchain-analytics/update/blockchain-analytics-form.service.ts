import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IBlockchainAnalytics, NewBlockchainAnalytics } from '../blockchain-analytics.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBlockchainAnalytics for edit and NewBlockchainAnalyticsFormGroupInput for create.
 */
type BlockchainAnalyticsFormGroupInput = IBlockchainAnalytics | PartialWithRequiredKeyOf<NewBlockchainAnalytics>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IBlockchainAnalytics | NewBlockchainAnalytics> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

type BlockchainAnalyticsFormRawValue = FormValueOf<IBlockchainAnalytics>;

type NewBlockchainAnalyticsFormRawValue = FormValueOf<NewBlockchainAnalytics>;

type BlockchainAnalyticsFormDefaults = Pick<NewBlockchainAnalytics, 'id' | 'timestamp'>;

type BlockchainAnalyticsFormGroupContent = {
  id: FormControl<BlockchainAnalyticsFormRawValue['id'] | NewBlockchainAnalytics['id']>;
  transactionCount: FormControl<BlockchainAnalyticsFormRawValue['transactionCount']>;
  averageTransactionFee: FormControl<BlockchainAnalyticsFormRawValue['averageTransactionFee']>;
  hashrateDistribution: FormControl<BlockchainAnalyticsFormRawValue['hashrateDistribution']>;
  timestamp: FormControl<BlockchainAnalyticsFormRawValue['timestamp']>;
  difficulty: FormControl<BlockchainAnalyticsFormRawValue['difficulty']>;
  networkHashrate: FormControl<BlockchainAnalyticsFormRawValue['networkHashrate']>;
};

export type BlockchainAnalyticsFormGroup = FormGroup<BlockchainAnalyticsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BlockchainAnalyticsFormService {
  createBlockchainAnalyticsFormGroup(blockchainAnalytics: BlockchainAnalyticsFormGroupInput = { id: null }): BlockchainAnalyticsFormGroup {
    const blockchainAnalyticsRawValue = this.convertBlockchainAnalyticsToBlockchainAnalyticsRawValue({
      ...this.getFormDefaults(),
      ...blockchainAnalytics,
    });
    return new FormGroup<BlockchainAnalyticsFormGroupContent>({
      id: new FormControl(
        { value: blockchainAnalyticsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      transactionCount: new FormControl(blockchainAnalyticsRawValue.transactionCount),
      averageTransactionFee: new FormControl(blockchainAnalyticsRawValue.averageTransactionFee),
      hashrateDistribution: new FormControl(blockchainAnalyticsRawValue.hashrateDistribution),
      timestamp: new FormControl(blockchainAnalyticsRawValue.timestamp),
      difficulty: new FormControl(blockchainAnalyticsRawValue.difficulty),
      networkHashrate: new FormControl(blockchainAnalyticsRawValue.networkHashrate),
    });
  }

  getBlockchainAnalytics(form: BlockchainAnalyticsFormGroup): IBlockchainAnalytics | NewBlockchainAnalytics {
    return this.convertBlockchainAnalyticsRawValueToBlockchainAnalytics(
      form.getRawValue() as BlockchainAnalyticsFormRawValue | NewBlockchainAnalyticsFormRawValue,
    );
  }

  resetForm(form: BlockchainAnalyticsFormGroup, blockchainAnalytics: BlockchainAnalyticsFormGroupInput): void {
    const blockchainAnalyticsRawValue = this.convertBlockchainAnalyticsToBlockchainAnalyticsRawValue({
      ...this.getFormDefaults(),
      ...blockchainAnalytics,
    });
    form.reset(
      {
        ...blockchainAnalyticsRawValue,
        id: { value: blockchainAnalyticsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): BlockchainAnalyticsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timestamp: currentTime,
    };
  }

  private convertBlockchainAnalyticsRawValueToBlockchainAnalytics(
    rawBlockchainAnalytics: BlockchainAnalyticsFormRawValue | NewBlockchainAnalyticsFormRawValue,
  ): IBlockchainAnalytics | NewBlockchainAnalytics {
    return {
      ...rawBlockchainAnalytics,
      timestamp: dayjs(rawBlockchainAnalytics.timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertBlockchainAnalyticsToBlockchainAnalyticsRawValue(
    blockchainAnalytics: IBlockchainAnalytics | (Partial<NewBlockchainAnalytics> & BlockchainAnalyticsFormDefaults),
  ): BlockchainAnalyticsFormRawValue | PartialWithRequiredKeyOf<NewBlockchainAnalyticsFormRawValue> {
    return {
      ...blockchainAnalytics,
      timestamp: blockchainAnalytics.timestamp ? blockchainAnalytics.timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
