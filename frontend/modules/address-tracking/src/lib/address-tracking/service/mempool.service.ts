import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'modules/shared/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MempoolService {
  private baseUrl = environment.mempool;

  constructor(private http: HttpClient) { }

  getAddressInfo(address: string): Observable<any> {
    const url = `${this.baseUrl}/address/${address}`;
    return this.http.get(url);
  }

  getTransactions(address: string): Observable<any> {
    const url = `${this.baseUrl}/address/${address}/txs`;
    return this.http.get(url);
  }
}
