import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IOHLCVT12h } from '../ohlcvt-12-h.model';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-12-h-detail',
  templateUrl: './ohlcvt-12-h-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class OHLCVT12hDetailComponent {
  @Input() oHLCVT12h: IOHLCVT12h | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
