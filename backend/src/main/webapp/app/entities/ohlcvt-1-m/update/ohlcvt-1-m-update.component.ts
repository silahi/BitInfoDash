import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IOHLCVT1m } from '../ohlcvt-1-m.model';
import { OHLCVT1mService } from '../service/ohlcvt-1-m.service';
import { OHLCVT1mFormService, OHLCVT1mFormGroup } from './ohlcvt-1-m-form.service';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-1-m-update',
  templateUrl: './ohlcvt-1-m-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OHLCVT1mUpdateComponent implements OnInit {
  isSaving = false;
  oHLCVT1m: IOHLCVT1m | null = null;

  editForm: OHLCVT1mFormGroup = this.oHLCVT1mFormService.createOHLCVT1mFormGroup();

  constructor(
    protected oHLCVT1mService: OHLCVT1mService,
    protected oHLCVT1mFormService: OHLCVT1mFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oHLCVT1m }) => {
      this.oHLCVT1m = oHLCVT1m;
      if (oHLCVT1m) {
        this.updateForm(oHLCVT1m);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const oHLCVT1m = this.oHLCVT1mFormService.getOHLCVT1m(this.editForm);
    if (oHLCVT1m.id !== null) {
      this.subscribeToSaveResponse(this.oHLCVT1mService.update(oHLCVT1m));
    } else {
      this.subscribeToSaveResponse(this.oHLCVT1mService.create(oHLCVT1m));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOHLCVT1m>>): void {
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

  protected updateForm(oHLCVT1m: IOHLCVT1m): void {
    this.oHLCVT1m = oHLCVT1m;
    this.oHLCVT1mFormService.resetForm(this.editForm, oHLCVT1m);
  }
}
