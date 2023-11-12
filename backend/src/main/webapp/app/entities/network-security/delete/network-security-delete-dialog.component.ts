import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { INetworkSecurity } from '../network-security.model';
import { NetworkSecurityService } from '../service/network-security.service';

@Component({
  standalone: true,
  templateUrl: './network-security-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class NetworkSecurityDeleteDialogComponent {
  networkSecurity?: INetworkSecurity;

  constructor(
    protected networkSecurityService: NetworkSecurityService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.networkSecurityService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
