import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IOHLCVT1h } from '../ohlcvt-1-h.model';
import { OHLCVT1hService } from '../service/ohlcvt-1-h.service';

@Component({
  standalone: true,
  templateUrl: './ohlcvt-1-h-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class OHLCVT1hDeleteDialogComponent {
  oHLCVT1h?: IOHLCVT1h;

  constructor(
    protected oHLCVT1hService: OHLCVT1hService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.oHLCVT1hService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
