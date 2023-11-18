import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IOHLCVT1m } from '../ohlcvt-1-m.model';
import { OHLCVT1mService } from '../service/ohlcvt-1-m.service';

@Component({
  standalone: true,
  templateUrl: './ohlcvt-1-m-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class OHLCVT1mDeleteDialogComponent {
  oHLCVT1m?: IOHLCVT1m;

  constructor(
    protected oHLCVT1mService: OHLCVT1mService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.oHLCVT1mService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
