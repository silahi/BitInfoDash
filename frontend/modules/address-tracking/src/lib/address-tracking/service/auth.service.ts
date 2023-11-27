import { Injectable } from '@angular/core';
import { SharedService } from '@bit-info-dash/shared';
import { BitcoinAddressService } from './address.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private bitcoinAddressService: BitcoinAddressService,
        private sharedService: SharedService,
    ) { }


    authenticateUser(username: string, password: string): void {
        this.sharedService.authenticate('/authenticate', { username: username, password: password }).subscribe({
            next: () => {
                const temporaryAddresses = this.bitcoinAddressService.getTemporaryAddresses();
                if (temporaryAddresses.length > 0) {
                    this.sharedService.createElement("/bitcoin-adresses", temporaryAddresses);
                }
            },
            error: (error) => {
                console.error('Authentication error:', error);
            }
        });



    }
}
