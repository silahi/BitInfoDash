
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'modules/shared/src/environments/environment';
import { Observable } from 'rxjs';

export interface OHLCEntry {
    time: number;
    open: string;
    high: string;
    low: string;
    close: string;
    vwap: string;
    volume: string;
    count: number;
}

export interface KrakenSymbol {
    symbol: number;
    label: string;
}

export const KRANKEN_SYMBOLS: KrakenSymbol[] = [
    { symbol: 60, label: '1 Heure' },
    { symbol: 240, label: '4 Heures' },
    { symbol: 1440, label: '1 Jour' },
    { symbol: 10080, label: '1 Semaine' },
    { symbol: 21600, label: '15 Jours' },
];

@Injectable({
    providedIn: 'root',
})
export class KrakenDataService {
    baseUrl = environment.krakenAPIURL;

    constructor(private http: HttpClient) { }

    processKrakenApiResponse(response: any): OHLCEntry[] {
        if (!response || !response.result || !response.result.XXBTZUSD) {
            return [];
        }

        const rawData = response.result.XXBTZUSD;
        console.log("size : ", rawData.length);
        const ohlcData: OHLCEntry[] = rawData.map((entry: any) => {
            return {
                time: entry[0],
                open: entry[1],
                high: entry[2],
                low: entry[3],
                close: entry[4],
                vwap: entry[5],
                volume: entry[6],
                count: entry[7],
            };
        });
        console.log("OHLC DATA : ", ohlcData.length);
        return ohlcData;
    }

    getOHLCData(interval: any): Observable<any> {
        const url = `${this.baseUrl}/OHLC?pair=XBTUSD&interval=${interval}`;
        return this.http.get(url);
    }

}
