import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { INetworkSecurity } from '../network-security.model';
import { NetworkSecurityService } from '../service/network-security.service';
import { NetworkSecurityFormService, NetworkSecurityFormGroup } from './network-security-form.service';

@Component({
  standalone: true,
  selector: 'jhi-network-security-update',
  templateUrl: './network-security-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class NetworkSecurityUpdateComponent implements OnInit {
  isSaving = false;
  networkSecurity: INetworkSecurity | null = null;

  editForm: NetworkSecurityFormGroup = this.networkSecurityFormService.createNetworkSecurityFormGroup();

  constructor(
    protected networkSecurityService: NetworkSecurityService,
    protected networkSecurityFormService: NetworkSecurityFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ networkSecurity }) => {
      this.networkSecurity = networkSecurity;
      if (networkSecurity) {
        this.updateForm(networkSecurity);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const networkSecurity = this.networkSecurityFormService.getNetworkSecurity(this.editForm);
    if (networkSecurity.id !== null) {
      this.subscribeToSaveResponse(this.networkSecurityService.update(networkSecurity));
    } else {
      this.subscribeToSaveResponse(this.networkSecurityService.create(networkSecurity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INetworkSecurity>>): void {
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

  protected updateForm(networkSecurity: INetworkSecurity): void {
    this.networkSecurity = networkSecurity;
    this.networkSecurityFormService.resetForm(this.editForm, networkSecurity);
  }
}
