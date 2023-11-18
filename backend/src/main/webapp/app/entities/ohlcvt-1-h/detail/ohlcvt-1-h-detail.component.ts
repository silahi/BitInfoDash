import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IOHLCVT1h } from '../ohlcvt-1-h.model';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-1-h-detail',
  templateUrl: './ohlcvt-1-h-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class OHLCVT1hDetailComponent {
  @Input() oHLCVT1h: IOHLCVT1h | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
