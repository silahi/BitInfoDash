import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IBitcoinAddress } from '../bitcoin-address.model';

@Component({
  standalone: true,
  selector: 'jhi-bitcoin-address-detail',
  templateUrl: './bitcoin-address-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class BitcoinAddressDetailComponent {
  @Input() bitcoinAddress: IBitcoinAddress | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
