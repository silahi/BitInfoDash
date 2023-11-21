
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'modules/bitcoin-overview/src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';   
@Injectable({
    providedIn: 'root',
})

export class AuthService {
    constructor(private http: HttpClient, private cookieService: CookieService) { }
    private tokenCookieKey = 'Bit_info_dash_token';
    private readonly apiUrl = environment.apiUrl + '/api/authenticate';
    
    setTokenInCookie(token: string): void {
        // Set the cookie with an expiration time (e.g., 1 day)
        this.cookieService.set(this.tokenCookieKey, token, 1);
    }

    getToken(): string | undefined {
        return this.cookieService.get(this.tokenCookieKey);
    }

    authenticate(username: string, password: string): Observable<any> {
        const credentials = { username, password };
        return this.http.post(this.apiUrl, credentials);
    }
}