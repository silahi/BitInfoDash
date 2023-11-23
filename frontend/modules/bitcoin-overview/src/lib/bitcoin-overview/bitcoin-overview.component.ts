import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CryptoData, bitcoinTestData } from './crypto-data.model';
import { BitcoinInfoComponent } from './bitcoin-info/bitcoin-info.component';
@Component({
  selector: 'bit-info-dash-bitcoin-overview',
  standalone: true,
  imports: [CommonModule, BitcoinInfoComponent],
  templateUrl: './bitcoin-overview.component.html',
  styleUrls: ['./bitcoin-overview.component.css'],
})

export class BitcoinOverviewComponent implements OnInit { 

  constructor() { }

  bitcoinData: CryptoData = bitcoinTestData;

  ngOnInit(): void {
     
  }   
}
