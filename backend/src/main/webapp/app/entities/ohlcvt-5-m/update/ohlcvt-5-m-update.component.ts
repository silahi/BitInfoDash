import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IOHLCVT5m } from '../ohlcvt-5-m.model';
import { OHLCVT5mService } from '../service/ohlcvt-5-m.service';
import { OHLCVT5mFormService, OHLCVT5mFormGroup } from './ohlcvt-5-m-form.service';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-5-m-update',
  templateUrl: './ohlcvt-5-m-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OHLCVT5mUpdateComponent implements OnInit {
  isSaving = false;
  oHLCVT5m: IOHLCVT5m | null = null;

  editForm: OHLCVT5mFormGroup = this.oHLCVT5mFormService.createOHLCVT5mFormGroup();

  constructor(
    protected oHLCVT5mService: OHLCVT5mService,
    protected oHLCVT5mFormService: OHLCVT5mFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oHLCVT5m }) => {
      this.oHLCVT5m = oHLCVT5m;
      if (oHLCVT5m) {
        this.updateForm(oHLCVT5m);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const oHLCVT5m = this.oHLCVT5mFormService.getOHLCVT5m(this.editForm);
    if (oHLCVT5m.id !== null) {
      this.subscribeToSaveResponse(this.oHLCVT5mService.update(oHLCVT5m));
    } else {
      this.subscribeToSaveResponse(this.oHLCVT5mService.create(oHLCVT5m));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOHLCVT5m>>): void {
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

  protected updateForm(oHLCVT5m: IOHLCVT5m): void {
    this.oHLCVT5m = oHLCVT5m;
    this.oHLCVT5mFormService.resetForm(this.editForm, oHLCVT5m);
  }
}
