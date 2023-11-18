import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IOHLCVT1d } from '../ohlcvt-1-d.model';

@Component({
  standalone: true,
  selector: 'jhi-ohlcvt-1-d-detail',
  templateUrl: './ohlcvt-1-d-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class OHLCVT1dDetailComponent {
  @Input() oHLCVT1d: IOHLCVT1d | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
