import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IOHLCVT15m } from '../ohlcvt-15-m.model';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-15-m-detail',
  templateUrl: './ohlcvt-15-m-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class OHLCVT15mDetailComponent {
  @Input() oHLCVT15m: IOHLCVT15m | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
