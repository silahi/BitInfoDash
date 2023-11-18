import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IOHLCVT15m } from '../ohlcvt-15-m.model';
import { OHLCVT15mService } from '../service/ohlcvt-15-m.service';
import { OHLCVT15mFormService, OHLCVT15mFormGroup } from './ohlcvt-15-m-form.service';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-15-m-update',
  templateUrl: './ohlcvt-15-m-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OHLCVT15mUpdateComponent implements OnInit {
  isSaving = false;
  oHLCVT15m: IOHLCVT15m | null = null;

  editForm: OHLCVT15mFormGroup = this.oHLCVT15mFormService.createOHLCVT15mFormGroup();

  constructor(
    protected oHLCVT15mService: OHLCVT15mService,
    protected oHLCVT15mFormService: OHLCVT15mFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oHLCVT15m }) => {
      this.oHLCVT15m = oHLCVT15m;
      if (oHLCVT15m) {
        this.updateForm(oHLCVT15m);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const oHLCVT15m = this.oHLCVT15mFormService.getOHLCVT15m(this.editForm);
    if (oHLCVT15m.id !== null) {
      this.subscribeToSaveResponse(this.oHLCVT15mService.update(oHLCVT15m));
    } else {
      this.subscribeToSaveResponse(this.oHLCVT15mService.create(oHLCVT15m));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOHLCVT15m>>): void {
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

  protected updateForm(oHLCVT15m: IOHLCVT15m): void {
    this.oHLCVT15m = oHLCVT15m;
    this.oHLCVT15mFormService.resetForm(this.editForm, oHLCVT15m);
  }
}
