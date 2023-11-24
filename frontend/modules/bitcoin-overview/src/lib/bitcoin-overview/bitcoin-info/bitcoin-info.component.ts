import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bit-info-dash-bitcoin-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bitcoin-info.component.html',
})
export class BitcoinInfoComponent {
  @Input() title: string | undefined;
  @Input() amount !: number | 0.00;
  @Input() variation !: number | 0.00;
  @Input() src: string | undefined;
  @Input() alt: string | undefined;
}
