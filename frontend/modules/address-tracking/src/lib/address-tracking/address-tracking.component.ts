import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SessionStorageService } from 'ngx-webstorage';
import { BitcoinInfoComponent } from './bitcoin-info/bitcoin-info.component';
import { MempoolAddress, MempoolTransaction, mapResponseToCustomTransactions, mapResponseToMempoolAddress } from './service/address.model';
import { MempoolService } from './service/mempool.service';
import { IChartApi, createChart } from 'lightweight-charts';

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
  addressTransactions: MempoolTransaction[] = [];
  addressInfo: any;

  currentAddress: string = "";
  showChart = false;
  amountChart = true; 
  feeChart = false;
  confirmationChart = false;
  metric = "amount";
  chartTitle = "Montant";
  chartData: MempoolTransaction[] = [];

  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chart!: IChartApi;

  selectAddress(saddress: string) {
    this.currentAddress = saddress;
  }

  getColorClass(classFor: boolean): string {
    return classFor ? 'text-white bg-secondary' : 'text-slate-900 bg-white';
  }

  detail(selectedAddress: string) {
    this.showChart = true;
    this.mempoolService.getTransactions(selectedAddress).subscribe({
      next: (mempoolResponse) => {
        const transactions = mapResponseToCustomTransactions(mempoolResponse);
        this.addressTransactions = transactions;
        this.chartData = transactions;
        this.buildChart(transactions);
      },
      error: (error) => {
        alert("Ce n'est pas une adresse bitcoin valide !");
        console.error('Error fetching address information', error.httpErrorResponse.message);
      }
    });
  }

  chartFor(metric: string) {
    if (metric === 'amount') {
      this.amountChart = true; 
      this.feeChart = false;
      this.confirmationChart = false;
      this.chartTitle = "du montant des transaction";
    }

    if (metric === 'fee') {
      this.amountChart = false; 
      this.feeChart = true;
      this.confirmationChart = false;
      this.chartTitle = "des frais de transactions";
    }
    if (metric === 'confirmation') {
      this.amountChart = false; 
      this.feeChart = false;
      this.confirmationChart = true;
      this.chartTitle = "du nombre de confirmations";
    }

    this.buildChart(this.chartData);
  }

  buildChart(data: any) {
    var container = this.chartContainer.nativeElement;

    const chartContainerElement: HTMLElement = this.chartContainer.nativeElement;
    chartContainerElement.innerHTML = "";
    const chartContainerWidth: number = chartContainerElement.offsetWidth;

    var width = 97 * chartContainerWidth / 100;
    var height = 300;

    var chart = createChart(container, {
      rightPriceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        horzLines: {
          color: '#eee',
        },
        vertLines: {
          color: '#ffffff',
        },
      },
      crosshair: {
        vertLine: {
          labelVisible: false,
        },
      },
    });

    chart.resize(width, height);

    var areaSeries = chart.addAreaSeries({
      topColor: 'rgba(0, 150, 136, 0.56)',
      bottomColor: 'rgba(0, 150, 136, 0.04)',
      lineColor: 'rgba(0, 150, 136, 1)',
      lineWidth: 2,
      lastValueVisible: true, 
    });

    data.sort((a: any, b: any) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

    if (this.amountChart) {
      const amountData = data.map((item: any) => ({
        time: new Date(item.datetime).getTime(),
        value: item.amount,
      }));
      areaSeries.setData(amountData);
    }

    if (this.feeChart) {
      const feesData = data.map((item: any) => ({
        time: new Date(item.datetime).getTime(),
        value: item.fee,
      }));
      areaSeries.setData(feesData);
    }

    if (this.confirmationChart) {
      const confData = data.map((item: any) => ({
        time: new Date(item.datetime).getTime(),
        value: item.confirmations,
      }));

      areaSeries.setData(confData);
    }

  }

  private sessionService: SessionStorageService;
  private mempoolService: MempoolService
  buttonCoordinates: { top: number, left: number } = { top: 0, left: 0 };
  cta = false;

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
    } else this.cta = true;
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
