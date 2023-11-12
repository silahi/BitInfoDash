import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBitcoinOverview } from '../bitcoin-overview.model';
import { BitcoinOverviewService } from '../service/bitcoin-overview.service';
import { BitcoinOverviewFormService, BitcoinOverviewFormGroup } from './bitcoin-overview-form.service';

@Component({
  standalone: true,
  selector: 'jhi-bitcoin-overview-update',
  templateUrl: './bitcoin-overview-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BitcoinOverviewUpdateComponent implements OnInit {
  isSaving = false;
  bitcoinOverview: IBitcoinOverview | null = null;

  editForm: BitcoinOverviewFormGroup = this.bitcoinOverviewFormService.createBitcoinOverviewFormGroup();

  constructor(
    protected bitcoinOverviewService: BitcoinOverviewService,
    protected bitcoinOverviewFormService: BitcoinOverviewFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bitcoinOverview }) => {
      this.bitcoinOverview = bitcoinOverview;
      if (bitcoinOverview) {
        this.updateForm(bitcoinOverview);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bitcoinOverview = this.bitcoinOverviewFormService.getBitcoinOverview(this.editForm);
    if (bitcoinOverview.id !== null) {
      this.subscribeToSaveResponse(this.bitcoinOverviewService.update(bitcoinOverview));
    } else {
      this.subscribeToSaveResponse(this.bitcoinOverviewService.create(bitcoinOverview));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBitcoinOverview>>): void {
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

  protected updateForm(bitcoinOverview: IBitcoinOverview): void {
    this.bitcoinOverview = bitcoinOverview;
    this.bitcoinOverviewFormService.resetForm(this.editForm, bitcoinOverview);
  }
}
