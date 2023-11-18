import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IOHLCVT1d } from '../ohlcvt-1-d.model';
import { OHLCVT1dService } from '../service/ohlcvt-1-d.service';

@Component({
  standalone: true,
  templateUrl: './ohlcvt-1-d-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class OHLCVT1dDeleteDialogComponent {
  oHLCVT1d?: IOHLCVT1d;

  constructor(
    protected oHLCVT1dService: OHLCVT1dService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.oHLCVT1dService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
