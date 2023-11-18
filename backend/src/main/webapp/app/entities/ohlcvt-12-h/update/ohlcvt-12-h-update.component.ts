import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IOHLCVT12h } from '../ohlcvt-12-h.model';
import { OHLCVT12hService } from '../service/ohlcvt-12-h.service';
import { OHLCVT12hFormService, OHLCVT12hFormGroup } from './ohlcvt-12-h-form.service';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-12-h-update',
  templateUrl: './ohlcvt-12-h-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OHLCVT12hUpdateComponent implements OnInit {
  isSaving = false;
  oHLCVT12h: IOHLCVT12h | null = null;

  editForm: OHLCVT12hFormGroup = this.oHLCVT12hFormService.createOHLCVT12hFormGroup();

  constructor(
    protected oHLCVT12hService: OHLCVT12hService,
    protected oHLCVT12hFormService: OHLCVT12hFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oHLCVT12h }) => {
      this.oHLCVT12h = oHLCVT12h;
      if (oHLCVT12h) {
        this.updateForm(oHLCVT12h);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const oHLCVT12h = this.oHLCVT12hFormService.getOHLCVT12h(this.editForm);
    if (oHLCVT12h.id !== null) {
      this.subscribeToSaveResponse(this.oHLCVT12hService.update(oHLCVT12h));
    } else {
      this.subscribeToSaveResponse(this.oHLCVT12hService.create(oHLCVT12h));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOHLCVT12h>>): void {
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

  protected updateForm(oHLCVT12h: IOHLCVT12h): void {
    this.oHLCVT12h = oHLCVT12h;
    this.oHLCVT12hFormService.resetForm(this.editForm, oHLCVT12h);
  }
}
