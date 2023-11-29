import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IChartApi, createChart } from 'lightweight-charts';
import { SharedService } from '@bit-info-dash/shared';
import moment from 'moment';

@Component({
  selector: 'bit-info-dash-bit-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bit-chart.component.html',
})
export class BitChartComponent implements AfterViewInit {
  constructor(private sharedService: SharedService) { }
  ngAfterViewInit(): void { 
    this.myChart();
  }
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chart!: IChartApi;  

  myChart(): void {  
    var container = this.chartContainer.nativeElement; 

    const chartContainerElement: HTMLElement = this.chartContainer.nativeElement;  
    const chartContainerWidth: number = chartContainerElement.offsetWidth;

    var width = chartContainerWidth;
    var height = 450;

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
        background: {color: '#ffffff' },
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
    });

    var volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    this.sharedService.getWithToken('/ohlcvt-1-ds', this.sharedService.getToken()).subscribe({
      next: (data) => {
        const priceData = data.map((item: any) => ({
          time: moment(item.timestamp).format("YYYY-MM-DD"),
          value: item.close * 1000,
        })); 

        const volumeData = data.map((item: any) => ({
          time: moment(item.timestamp).format("YYYY-MM-DD"),
          value: item.volume,
          color: item.close < item.high ?  'rgba(0, 150, 136, 0.8)' : 'rgba(255,82,82, 0.8)',
        })); 

        areaSeries.setData(priceData);
       //volumeSeries.setData(volumeData);
      },
      error: (error) => { console.error('Error fetching OHLCVT data:', error) }
    }) 

     
  }
}
