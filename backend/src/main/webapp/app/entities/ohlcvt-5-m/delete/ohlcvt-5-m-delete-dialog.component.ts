import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IOHLCVT5m } from '../ohlcvt-5-m.model';
import { OHLCVT5mService } from '../service/ohlcvt-5-m.service';

@Component({
  standalone: true,
  templateUrl: './ohlcvt-5-m-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class OHLCVT5mDeleteDialogComponent {
  oHLCVT5m?: IOHLCVT5m;

  constructor(
    protected oHLCVT5mService: OHLCVT5mService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.oHLCVT5mService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
