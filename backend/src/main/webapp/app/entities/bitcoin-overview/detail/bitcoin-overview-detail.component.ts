import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IBitcoinOverview } from '../bitcoin-overview.model';

@Component({
  standalone: true,
  selector: 'jhi-bitcoin-overview-detail',
  templateUrl: './bitcoin-overview-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class BitcoinOverviewDetailComponent {
  @Input() bitcoinOverview: IBitcoinOverview | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
