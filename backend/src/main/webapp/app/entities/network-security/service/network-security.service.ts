import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INetworkSecurity, NewNetworkSecurity } from '../network-security.model';

export type PartialUpdateNetworkSecurity = Partial<INetworkSecurity> & Pick<INetworkSecurity, 'id'>;

type RestOf<T extends INetworkSecurity | NewNetworkSecurity> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

export type RestNetworkSecurity = RestOf<INetworkSecurity>;

export type NewRestNetworkSecurity = RestOf<NewNetworkSecurity>;

export type PartialUpdateRestNetworkSecurity = RestOf<PartialUpdateNetworkSecurity>;

export type EntityResponseType = HttpResponse<INetworkSecurity>;
export type EntityArrayResponseType = HttpResponse<INetworkSecurity[]>;

@Injectable({ providedIn: 'root' })
export class NetworkSecurityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/network-securities');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(networkSecurity: NewNetworkSecurity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(networkSecurity);
    return this.http
      .post<RestNetworkSecurity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(networkSecurity: INetworkSecurity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(networkSecurity);
    return this.http
      .put<RestNetworkSecurity>(`${this.resourceUrl}/${this.getNetworkSecurityIdentifier(networkSecurity)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(networkSecurity: PartialUpdateNetworkSecurity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(networkSecurity);
    return this.http
      .patch<RestNetworkSecurity>(`${this.resourceUrl}/${this.getNetworkSecurityIdentifier(networkSecurity)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestNetworkSecurity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestNetworkSecurity[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNetworkSecurityIdentifier(networkSecurity: Pick<INetworkSecurity, 'id'>): number {
    return networkSecurity.id;
  }

  compareNetworkSecurity(o1: Pick<INetworkSecurity, 'id'> | null, o2: Pick<INetworkSecurity, 'id'> | null): boolean {
    return o1 && o2 ? this.getNetworkSecurityIdentifier(o1) === this.getNetworkSecurityIdentifier(o2) : o1 === o2;
  }

  addNetworkSecurityToCollectionIfMissing<Type extends Pick<INetworkSecurity, 'id'>>(
    networkSecurityCollection: Type[],
    ...networkSecuritiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const networkSecurities: Type[] = networkSecuritiesToCheck.filter(isPresent);
    if (networkSecurities.length > 0) {
      const networkSecurityCollectionIdentifiers = networkSecurityCollection.map(
        networkSecurityItem => this.getNetworkSecurityIdentifier(networkSecurityItem)!,
      );
      const networkSecuritiesToAdd = networkSecurities.filter(networkSecurityItem => {
        const networkSecurityIdentifier = this.getNetworkSecurityIdentifier(networkSecurityItem);
        if (networkSecurityCollectionIdentifiers.includes(networkSecurityIdentifier)) {
          return false;
        }
        networkSecurityCollectionIdentifiers.push(networkSecurityIdentifier);
        return true;
      });
      return [...networkSecuritiesToAdd, ...networkSecurityCollection];
    }
    return networkSecurityCollection;
  }

  protected convertDateFromClient<T extends INetworkSecurity | NewNetworkSecurity | PartialUpdateNetworkSecurity>(
    networkSecurity: T,
  ): RestOf<T> {
    return {
      ...networkSecurity,
      timestamp: networkSecurity.timestamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restNetworkSecurity: RestNetworkSecurity): INetworkSecurity {
    return {
      ...restNetworkSecurity,
      timestamp: restNetworkSecurity.timestamp ? dayjs(restNetworkSecurity.timestamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestNetworkSecurity>): HttpResponse<INetworkSecurity> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestNetworkSecurity[]>): HttpResponse<INetworkSecurity[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
