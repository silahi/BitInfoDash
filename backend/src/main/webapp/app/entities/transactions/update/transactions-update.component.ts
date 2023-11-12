import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBitcoinAddress } from 'app/entities/bitcoin-address/bitcoin-address.model';
import { BitcoinAddressService } from 'app/entities/bitcoin-address/service/bitcoin-address.service';
import { ITransactions } from '../transactions.model';
import { TransactionsService } from '../service/transactions.service';
import { TransactionsFormService, TransactionsFormGroup } from './transactions-form.service';

@Component({
  standalone: true,
  selector: 'jhi-transactions-update',
  templateUrl: './transactions-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TransactionsUpdateComponent implements OnInit {
  isSaving = false;
  transactions: ITransactions | null = null;

  bitcoinAddressesSharedCollection: IBitcoinAddress[] = [];

  editForm: TransactionsFormGroup = this.transactionsFormService.createTransactionsFormGroup();

  constructor(
    protected transactionsService: TransactionsService,
    protected transactionsFormService: TransactionsFormService,
    protected bitcoinAddressService: BitcoinAddressService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareBitcoinAddress = (o1: IBitcoinAddress | null, o2: IBitcoinAddress | null): boolean =>
    this.bitcoinAddressService.compareBitcoinAddress(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactions }) => {
      this.transactions = transactions;
      if (transactions) {
        this.updateForm(transactions);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transactions = this.transactionsFormService.getTransactions(this.editForm);
    if (transactions.id !== null) {
      this.subscribeToSaveResponse(this.transactionsService.update(transactions));
    } else {
      this.subscribeToSaveResponse(this.transactionsService.create(transactions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactions>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(transactions: ITransactions): void {
    this.transactions = transactions;
    this.transactionsFormService.resetForm(this.editForm, transactions);

    this.bitcoinAddressesSharedCollection = this.bitcoinAddressService.addBitcoinAddressToCollectionIfMissing<IBitcoinAddress>(
      this.bitcoinAddressesSharedCollection,
      transactions.bitcoinAddress,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.bitcoinAddressService
      .query()
      .pipe(map((res: HttpResponse<IBitcoinAddress[]>) => res.body ?? []))
      .pipe(
        map((bitcoinAddresses: IBitcoinAddress[]) =>
          this.bitcoinAddressService.addBitcoinAddressToCollectionIfMissing<IBitcoinAddress>(
            bitcoinAddresses,
            this.transactions?.bitcoinAddress,
          ),
        ),
      )
      .subscribe((bitcoinAddresses: IBitcoinAddress[]) => (this.bitcoinAddressesSharedCollection = bitcoinAddresses));
  }
}
