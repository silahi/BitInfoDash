import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitcoinOverviewComponent } from './bitcoin-overview.component';
import { CryptoDataService } from '../shared/models/services/crypto-data.service';

@NgModule({
    declarations: [BitcoinOverviewComponent],
    imports: [CommonModule],
    providers: [CryptoDataService],
})
export class BitcoinOverviewModule { }