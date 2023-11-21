import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData } from '../shared/models/crypto-data.model';
@Component({
  selector: 'bit-info-dash-bitcoin-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bitcoin-overview.component.html',
  styleUrls: ['./bitcoin-overview.component.css'],
})

export class BitcoinOverviewComponent implements OnInit {
  cryptoData!: CryptoData;

  constructor() { }

  ngOnInit(): void {
     
  }   
}
