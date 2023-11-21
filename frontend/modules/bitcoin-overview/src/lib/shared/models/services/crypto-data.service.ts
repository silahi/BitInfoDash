import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoData } from '../crypto-data.model';
import { environment } from 'modules/bitcoin-overview/src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class CryptoDataService {
    private apiUrl = environment.apiUrl + "/bitcoin-overviews";   
    constructor(private http: HttpClient, private authService : AuthService) { }

    getCryptoData(): Observable<CryptoData> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
        return this.http.get<CryptoData>(this.apiUrl, { headers });
    }
}
