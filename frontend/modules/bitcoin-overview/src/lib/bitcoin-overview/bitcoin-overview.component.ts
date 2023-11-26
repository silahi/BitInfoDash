import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData, bitcoinTestData } from './crypto-data.model';
import { BitcoinInfoComponent } from './bitcoin-info/bitcoin-info.component';
import { BitChartComponent } from "./bit-chart/bit-chart.component";
import { SharedService } from '@bit-info-dash/shared';
@Component({
  selector: 'bit-info-dash-bitcoin-overview',
  standalone: true,
  templateUrl: './bitcoin-overview.component.html',
  styleUrls: ['./bitcoin-overview.component.css'],
  imports: [CommonModule, BitcoinInfoComponent, BitChartComponent]
})

export class BitcoinOverviewComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  bitcoinData: CryptoData = bitcoinTestData;



  ngOnInit(): void {
    this.setToken().then(() => {
      this.fetchOverviewData();
    }); 
  }

  private fetchOverviewData(): void {
    this.sharedService.getWithToken('/bitcoin-overviews', this.sharedService.getToken()).subscribe({
      next: (data) => { this.bitcoinData = data },
      error: (error) => { console.error('Error fetching overview data:', error) }
    })
  }

  private async setToken(): Promise<void> {
    const token = this.sharedService.getToken();
    if (!token) {
      const credentials = { "username": "user", "password": "user", "rememberMe": true };
      this.sharedService.authenticate('/authenticate', credentials).subscribe({
        next: (response) => {
          this.sharedService.setTokenInCookie(response.id_token);
        },
        error: (error) => {
          console.error('Authentication error:', error);
        }
      });
    }
  }
}
