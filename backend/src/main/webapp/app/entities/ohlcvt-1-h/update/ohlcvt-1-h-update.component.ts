import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IOHLCVT1h } from '../ohlcvt-1-h.model';
import { OHLCVT1hService } from '../service/ohlcvt-1-h.service';
import { OHLCVT1hFormService, OHLCVT1hFormGroup } from './ohlcvt-1-h-form.service';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-1-h-update',
  templateUrl: './ohlcvt-1-h-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OHLCVT1hUpdateComponent implements OnInit {
  isSaving = false;
  oHLCVT1h: IOHLCVT1h | null = null;

  editForm: OHLCVT1hFormGroup = this.oHLCVT1hFormService.createOHLCVT1hFormGroup();

  constructor(
    protected oHLCVT1hService: OHLCVT1hService,
    protected oHLCVT1hFormService: OHLCVT1hFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oHLCVT1h }) => {
      this.oHLCVT1h = oHLCVT1h;
      if (oHLCVT1h) {
        this.updateForm(oHLCVT1h);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const oHLCVT1h = this.oHLCVT1hFormService.getOHLCVT1h(this.editForm);
    if (oHLCVT1h.id !== null) {
      this.subscribeToSaveResponse(this.oHLCVT1hService.update(oHLCVT1h));
    } else {
      this.subscribeToSaveResponse(this.oHLCVT1hService.create(oHLCVT1h));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOHLCVT1h>>): void {
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

  protected updateForm(oHLCVT1h: IOHLCVT1h): void {
    this.oHLCVT1h = oHLCVT1h;
    this.oHLCVT1hFormService.resetForm(this.editForm, oHLCVT1h);
  }
}
