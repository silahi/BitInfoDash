import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IOHLCVT15m } from '../ohlcvt-15-m.model';
import { OHLCVT15mService } from '../service/ohlcvt-15-m.service';

@Component({
  standalone: true,
  templateUrl: './ohlcvt-15-m-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class OHLCVT15mDeleteDialogComponent {
  oHLCVT15m?: IOHLCVT15m;

  constructor(
    protected oHLCVT15mService: OHLCVT15mService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.oHLCVT15mService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
