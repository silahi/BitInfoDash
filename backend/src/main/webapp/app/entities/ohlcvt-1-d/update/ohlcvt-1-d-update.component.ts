import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IOHLCVT1d } from '../ohlcvt-1-d.model';
import { OHLCVT1dService } from '../service/ohlcvt-1-d.service';
import { OHLCVT1dFormService, OHLCVT1dFormGroup } from './ohlcvt-1-d-form.service';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-1-d-update',
  templateUrl: './ohlcvt-1-d-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OHLCVT1dUpdateComponent implements OnInit {
  isSaving = false;
  oHLCVT1d: IOHLCVT1d | null = null;

  editForm: OHLCVT1dFormGroup = this.oHLCVT1dFormService.createOHLCVT1dFormGroup();

  constructor(
    protected oHLCVT1dService: OHLCVT1dService,
    protected oHLCVT1dFormService: OHLCVT1dFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oHLCVT1d }) => {
      this.oHLCVT1d = oHLCVT1d;
      if (oHLCVT1d) {
        this.updateForm(oHLCVT1d);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const oHLCVT1d = this.oHLCVT1dFormService.getOHLCVT1d(this.editForm);
    if (oHLCVT1d.id !== null) {
      this.subscribeToSaveResponse(this.oHLCVT1dService.update(oHLCVT1d));
    } else {
      this.subscribeToSaveResponse(this.oHLCVT1dService.create(oHLCVT1d));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOHLCVT1d>>): void {
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

  protected updateForm(oHLCVT1d: IOHLCVT1d): void {
    this.oHLCVT1d = oHLCVT1d;
    this.oHLCVT1dFormService.resetForm(this.editForm, oHLCVT1d);
  }
}
