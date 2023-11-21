import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BitcoinOverviewComponent } from '@bit-info-dash/bitcoin-overview';

@Component({
  standalone: true,
  imports: [NavbarComponent, RouterModule, BitcoinOverviewComponent],
  selector: 'bit-info-dash-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Bit-info-dash';
}
