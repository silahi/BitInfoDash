import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IChartApi, createChart } from 'lightweight-charts';
import { SharedService } from '@bit-info-dash/shared';
import { KRANKEN_SYMBOLS, KrakenDataService, KrakenSymbol } from '../services/kraken-data.service';

@Component({
  selector: 'bit-info-dash-bit-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bit-chart.component.html',
})
export class BitChartComponent implements AfterViewInit {
  constructor(private sharedService: SharedService, private krakenService: KrakenDataService) { }

  ngAfterViewInit(): void {
    this.myChart();
  }
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chart!: IChartApi;

  symbols: KrakenSymbol[] = KRANKEN_SYMBOLS;
  symbol = this.symbols[0].symbol;

  changeSymbol(_symbol: any) {
    this.symbol = _symbol;
    this.myChart();
  }

  getClassColor(_symbol: any) {
    return _symbol === this.symbol ? 'text-white bg-secondary' : 'text-slate-600 border hover:text-primary-100 bg-white';
  }

  myChart(): void {
    var container = this.chartContainer.nativeElement;

    const chartContainerElement: HTMLElement = this.chartContainer.nativeElement;

    const chartContainerWidth: number = chartContainerElement.offsetWidth;
    chartContainerElement.innerHTML = "";
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
    });


    var volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    this.krakenService.getOHLCData(this.symbol).subscribe({
      next: (data) => {
        const processedData = this.krakenService.processKrakenApiResponse(data);
        const priceData = processedData.map((item: any) => ({
          // time: moment(item.timestamp).format("YYYY-MM-DD"),
          time: item.time,
          value: item.close * 1,
        }));

        const volumeData = processedData.map((item: any) => ({
          time: item.time,
          value: item.volume * 1,
          color: item.close * 1 < item.high ? 'rgba(0, 150, 136, 0.8)' : 'rgba(255,82,82, 0.8)',
        }));

        areaSeries.setData(priceData);
        volumeSeries.setData(volumeData);
      },
      error: (error) => { console.error('Error fetching OHLCVT data:', error) }
    })


  }
}
