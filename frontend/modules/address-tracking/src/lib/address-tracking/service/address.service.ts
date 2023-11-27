import { Injectable } from '@angular/core';
import { Address } from './address.model';
import { SharedService } from '@bit-info-dash/shared';

@Injectable({
    providedIn: 'root',
})
export class BitcoinAddressService {
    private addresses: Address[] = [];

    constructor(private sharedService: SharedService) { }


    addTemporaryAddress(address: Address): void {
        this.addresses.push(address);
    }


    getTemporaryAddresses(): Address[] {
        return this.addresses;
    }


    clearTemporaryAddresses(): void {
        this.addresses = [];
    }
}
