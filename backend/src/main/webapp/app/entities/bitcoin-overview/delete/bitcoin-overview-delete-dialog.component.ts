import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IBitcoinOverview } from '../bitcoin-overview.model';
import { BitcoinOverviewService } from '../service/bitcoin-overview.service';

@Component({
  standalone: true,
  templateUrl: './bitcoin-overview-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class BitcoinOverviewDeleteDialogComponent {
  bitcoinOverview?: IBitcoinOverview;

  constructor(
    protected bitcoinOverviewService: BitcoinOverviewService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bitcoinOverviewService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
