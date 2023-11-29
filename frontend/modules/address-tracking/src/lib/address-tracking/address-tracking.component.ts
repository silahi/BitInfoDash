import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SessionStorageService } from 'ngx-webstorage';
import { BitcoinInfoComponent } from './bitcoin-info/bitcoin-info.component';
import { MempoolAddress, mapResponseToMempoolAddress } from './service/address.model';
import { MempoolService } from './service/mempool.service';

const ADDRESSES_SESSION_KEY = "addresses";
@Component({
  selector: 'bit-info-dash-address-tracking',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, FormsModule, BitcoinInfoComponent],
  templateUrl: './address-tracking.component.html',
  styleUrls: ['./address-tracking.component.css'],
})
export class AddressTrackingComponent implements OnInit {

  label: string = '';
  address: string = '';
  addresses: MempoolAddress[] = [];
  addressInfo: any;

  currentAddress: string = "";

  selectAddress(saddress: string) {
    this.currentAddress = saddress;
  }

  detail() {

  }

  private sessionService: SessionStorageService;
  private mempoolService: MempoolService
  buttonCoordinates: { top: number, left: number } = { top: 0, left: 0 };
  cta = true;

  hideCTA() {
    this.cta = false;
  }

  constructor(sessionStorageService: SessionStorageService, mempoolApiService: MempoolService) {
    this.sessionService = sessionStorageService;
    this.mempoolService = mempoolApiService;
  }
  ngOnInit(): void {
    this.addresses = this.sessionService.retrieve(ADDRESSES_SESSION_KEY) ?? [];
    const updatedAddresses: MempoolAddress[] = [];
    if (this.addresses.length > 0) {
      this.cta = false;
      this.addresses.forEach((address: MempoolAddress) => {
        const alabel = address.label;
        this.mempoolService.getAddressInfo(address.address).subscribe({
          next: (mempoolResponse) => {
            const updatedAddress = mapResponseToMempoolAddress(mempoolResponse);
            updatedAddress.label = alabel;
            updatedAddresses.push(updatedAddress);
          },
          error: (error) => {
            console.error('Error fetching address information', error.message);
          }
        });
      });
      this.sessionService.store(ADDRESSES_SESSION_KEY, updatedAddresses);
    }
  }
  showModal: boolean = false;

  openModal() {
    this.cta = false;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveAddress() {
    if (this.label && this.address) {
      this.mempoolService.getAddressInfo(this.address).subscribe({
        next: (mempoolResponse) => {
          const mempoolAddress = mapResponseToMempoolAddress(mempoolResponse);
          mempoolAddress.label = this.label;
          let sessionAdddresses = this.sessionService.retrieve(ADDRESSES_SESSION_KEY) ?? [];
          sessionAdddresses.push(mempoolAddress);
          this.sessionService.store(ADDRESSES_SESSION_KEY, sessionAdddresses);
          this.addresses = sessionAdddresses;
          this.label = '';
          this.address = '';
          this.closeModal();
        },
        error: (error) => {
          alert("Ce n'est pas une adresse bitcoin valide !");
          console.error('Error fetching address information', error.httpErrorResponse.message);
        }
      });
    } else {
      alert("Entrez une  adresse bitcoin valide");
    }
  }

}
