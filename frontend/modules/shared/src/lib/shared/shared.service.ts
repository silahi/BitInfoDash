import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_KEY = "Token-bit-info-dash";
const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor(private cookieService: CookieService, private httpClient: HttpClient) { }

    public setTokenInCookie(token: string): void {
        // Set the token cookie with an expiration time (e.g., 1 day)
        this.cookieService.set(TOKEN_KEY, token, 1);
    }

    public getToken(): string | undefined {
        return this.cookieService.get(TOKEN_KEY);
    }

    public authenticate(endpoint: string, credentials: any): Observable<any> {
        const url = `${API_URL}${endpoint}`;
        return this.httpClient.post(url, credentials);
    }

    public getWithToken(endpoint: string, token: string): Observable<any> {
        const url = `${API_URL}${endpoint}`;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.httpClient.get(url, { headers });
    }

}
