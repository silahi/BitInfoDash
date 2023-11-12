import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBlockchainAnalytics } from '../blockchain-analytics.model';
import { BlockchainAnalyticsService } from '../service/blockchain-analytics.service';
import { BlockchainAnalyticsFormService, BlockchainAnalyticsFormGroup } from './blockchain-analytics-form.service';

@Component({
  standalone: true,
  selector: 'jhi-blockchain-analytics-update',
  templateUrl: './blockchain-analytics-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BlockchainAnalyticsUpdateComponent implements OnInit {
  isSaving = false;
  blockchainAnalytics: IBlockchainAnalytics | null = null;

  editForm: BlockchainAnalyticsFormGroup = this.blockchainAnalyticsFormService.createBlockchainAnalyticsFormGroup();

  constructor(
    protected blockchainAnalyticsService: BlockchainAnalyticsService,
    protected blockchainAnalyticsFormService: BlockchainAnalyticsFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ blockchainAnalytics }) => {
      this.blockchainAnalytics = blockchainAnalytics;
      if (blockchainAnalytics) {
        this.updateForm(blockchainAnalytics);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const blockchainAnalytics = this.blockchainAnalyticsFormService.getBlockchainAnalytics(this.editForm);
    if (blockchainAnalytics.id !== null) {
      this.subscribeToSaveResponse(this.blockchainAnalyticsService.update(blockchainAnalytics));
    } else {
      this.subscribeToSaveResponse(this.blockchainAnalyticsService.create(blockchainAnalytics));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBlockchainAnalytics>>): void {
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

  protected updateForm(blockchainAnalytics: IBlockchainAnalytics): void {
    this.blockchainAnalytics = blockchainAnalytics;
    this.blockchainAnalyticsFormService.resetForm(this.editForm, blockchainAnalytics);
  }
}
