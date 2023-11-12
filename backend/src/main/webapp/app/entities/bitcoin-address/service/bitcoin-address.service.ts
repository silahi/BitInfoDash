import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBitcoinAddress, NewBitcoinAddress } from '../bitcoin-address.model';

export type PartialUpdateBitcoinAddress = Partial<IBitcoinAddress> & Pick<IBitcoinAddress, 'id'>;

export type EntityResponseType = HttpResponse<IBitcoinAddress>;
export type EntityArrayResponseType = HttpResponse<IBitcoinAddress[]>;

@Injectable({ providedIn: 'root' })
export class BitcoinAddressService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/bitcoin-addresses');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(bitcoinAddress: NewBitcoinAddress): Observable<EntityResponseType> {
    return this.http.post<IBitcoinAddress>(this.resourceUrl, bitcoinAddress, { observe: 'response' });
  }

  update(bitcoinAddress: IBitcoinAddress): Observable<EntityResponseType> {
    return this.http.put<IBitcoinAddress>(`${this.resourceUrl}/${this.getBitcoinAddressIdentifier(bitcoinAddress)}`, bitcoinAddress, {
      observe: 'response',
    });
  }

  partialUpdate(bitcoinAddress: PartialUpdateBitcoinAddress): Observable<EntityResponseType> {
    return this.http.patch<IBitcoinAddress>(`${this.resourceUrl}/${this.getBitcoinAddressIdentifier(bitcoinAddress)}`, bitcoinAddress, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBitcoinAddress>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBitcoinAddress[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBitcoinAddressIdentifier(bitcoinAddress: Pick<IBitcoinAddress, 'id'>): number {
    return bitcoinAddress.id;
  }

  compareBitcoinAddress(o1: Pick<IBitcoinAddress, 'id'> | null, o2: Pick<IBitcoinAddress, 'id'> | null): boolean {
    return o1 && o2 ? this.getBitcoinAddressIdentifier(o1) === this.getBitcoinAddressIdentifier(o2) : o1 === o2;
  }

  addBitcoinAddressToCollectionIfMissing<Type extends Pick<IBitcoinAddress, 'id'>>(
    bitcoinAddressCollection: Type[],
    ...bitcoinAddressesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const bitcoinAddresses: Type[] = bitcoinAddressesToCheck.filter(isPresent);
    if (bitcoinAddresses.length > 0) {
      const bitcoinAddressCollectionIdentifiers = bitcoinAddressCollection.map(
        bitcoinAddressItem => this.getBitcoinAddressIdentifier(bitcoinAddressItem)!,
      );
      const bitcoinAddressesToAdd = bitcoinAddresses.filter(bitcoinAddressItem => {
        const bitcoinAddressIdentifier = this.getBitcoinAddressIdentifier(bitcoinAddressItem);
        if (bitcoinAddressCollectionIdentifiers.includes(bitcoinAddressIdentifier)) {
          return false;
        }
        bitcoinAddressCollectionIdentifiers.push(bitcoinAddressIdentifier);
        return true;
      });
      return [...bitcoinAddressesToAdd, ...bitcoinAddressCollection];
    }
    return bitcoinAddressCollection;
  }
}
