import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IBlockchainAnalytics } from '../blockchain-analytics.model';

@Component({
  standalone: true,
  selector: 'jhi-blockchain-analytics-detail',
  templateUrl: './blockchain-analytics-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class BlockchainAnalyticsDetailComponent {
  @Input() blockchainAnalytics: IBlockchainAnalytics | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
