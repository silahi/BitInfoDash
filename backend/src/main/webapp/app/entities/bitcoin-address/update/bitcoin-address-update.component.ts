import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBitcoinAddress } from '../bitcoin-address.model';
import { BitcoinAddressService } from '../service/bitcoin-address.service';
import { BitcoinAddressFormService, BitcoinAddressFormGroup } from './bitcoin-address-form.service';

@Component({
  standalone: true,
  selector: 'jhi-bitcoin-address-update',
  templateUrl: './bitcoin-address-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BitcoinAddressUpdateComponent implements OnInit {
  isSaving = false;
  bitcoinAddress: IBitcoinAddress | null = null;

  editForm: BitcoinAddressFormGroup = this.bitcoinAddressFormService.createBitcoinAddressFormGroup();

  constructor(
    protected bitcoinAddressService: BitcoinAddressService,
    protected bitcoinAddressFormService: BitcoinAddressFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bitcoinAddress }) => {
      this.bitcoinAddress = bitcoinAddress;
      if (bitcoinAddress) {
        this.updateForm(bitcoinAddress);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bitcoinAddress = this.bitcoinAddressFormService.getBitcoinAddress(this.editForm);
    if (bitcoinAddress.id !== null) {
      this.subscribeToSaveResponse(this.bitcoinAddressService.update(bitcoinAddress));
    } else {
      this.subscribeToSaveResponse(this.bitcoinAddressService.create(bitcoinAddress));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBitcoinAddress>>): void {
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

  protected updateForm(bitcoinAddress: IBitcoinAddress): void {
    this.bitcoinAddress = bitcoinAddress;
    this.bitcoinAddressFormService.resetForm(this.editForm, bitcoinAddress);
  }
}
