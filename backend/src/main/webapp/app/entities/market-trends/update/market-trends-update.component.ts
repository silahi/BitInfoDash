import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IMarketTrends } from '../market-trends.model';
import { MarketTrendsService } from '../service/market-trends.service';
import { MarketTrendsFormService, MarketTrendsFormGroup } from './market-trends-form.service';

@Component({
  standalone: true,
  selector: 'jhi-market-trends-update',
  templateUrl: './market-trends-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class MarketTrendsUpdateComponent implements OnInit {
  isSaving = false;
  marketTrends: IMarketTrends | null = null;

  editForm: MarketTrendsFormGroup = this.marketTrendsFormService.createMarketTrendsFormGroup();

  constructor(
    protected marketTrendsService: MarketTrendsService,
    protected marketTrendsFormService: MarketTrendsFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ marketTrends }) => {
      this.marketTrends = marketTrends;
      if (marketTrends) {
        this.updateForm(marketTrends);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const marketTrends = this.marketTrendsFormService.getMarketTrends(this.editForm);
    if (marketTrends.id !== null) {
      this.subscribeToSaveResponse(this.marketTrendsService.update(marketTrends));
    } else {
      this.subscribeToSaveResponse(this.marketTrendsService.create(marketTrends));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMarketTrends>>): void {
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

  protected updateForm(marketTrends: IMarketTrends): void {
    this.marketTrends = marketTrends;
    this.marketTrendsFormService.resetForm(this.editForm, marketTrends);
  }
}
