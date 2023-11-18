import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IOHLCVT5m } from '../ohlcvt-5-m.model';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-5-m-detail',
  templateUrl: './ohlcvt-5-m-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class OHLCVT5mDetailComponent {
  @Input() oHLCVT5m: IOHLCVT5m | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
