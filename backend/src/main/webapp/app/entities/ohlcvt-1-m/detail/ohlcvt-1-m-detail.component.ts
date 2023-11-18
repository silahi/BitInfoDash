import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IOHLCVT1m } from '../ohlcvt-1-m.model';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-1-m-detail',
  templateUrl: './ohlcvt-1-m-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class OHLCVT1mDetailComponent {
  @Input() oHLCVT1m: IOHLCVT1m | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
