import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IMarketTrends } from '../market-trends.model';
import { MarketTrendsService } from '../service/market-trends.service';

@Component({
  standalone: true,
  templateUrl: './market-trends-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class MarketTrendsDeleteDialogComponent {
  marketTrends?: IMarketTrends;

  constructor(
    protected marketTrendsService: MarketTrendsService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.marketTrendsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
