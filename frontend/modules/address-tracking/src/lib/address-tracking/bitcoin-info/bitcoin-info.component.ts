import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bit-info-dash-bitcoin-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bitcoin-info.component.html',
})
export class BitcoinInfoComponent {
  @Input() address: string | undefined;
  @Input() label: string | undefined;
  @Input() balance !: number | 0.00;
  @Input() received !: number | 0.00;
  @Input() sent !: number | 0.00;
  @Input() txCount !: number | 0;
  @Input() confirmedTx !: number | 0;
  @Input() unConfirmedTx !: number | 0;
}
