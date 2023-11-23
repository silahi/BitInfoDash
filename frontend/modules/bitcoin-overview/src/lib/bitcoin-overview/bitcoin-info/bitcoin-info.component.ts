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
  @Input() amount: number | undefined;
  @Input() variation !: number | 0.00;
  @Input() icon: any;
}
