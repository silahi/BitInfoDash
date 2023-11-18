import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IOHLCVT12h } from '../ohlcvt-12-h.model';
import { OHLCVT12hService } from '../service/ohlcvt-12-h.service';

@Component({
  standalone: true,
  templateUrl: './ohlcvt-12-h-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class OHLCVT12hDeleteDialogComponent {
  oHLCVT12h?: IOHLCVT12h;

  constructor(
    protected oHLCVT12hService: OHLCVT12hService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.oHLCVT12hService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
