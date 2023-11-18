import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IBitcoinAddress } from 'app/entities/bitcoin-address/bitcoin-address.model';
import { BitcoinAddressService } from 'app/entities/bitcoin-address/service/bitcoin-address.service';
import { TransactionsService } from '../service/transactions.service';
import { ITransactions } from '../transactions.model';
import { TransactionsFormService } from './transactions-form.service';

import { TransactionsUpdateComponent } from './transactions-update.component';

describe('Transactions Management Update Component', () => {
  let comp: TransactionsUpdateComponent;
  let fixture: ComponentFixture<TransactionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let transactionsFormService: TransactionsFormService;
  let transactionsService: TransactionsService;
  let bitcoinAddressService: BitcoinAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TransactionsUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TransactionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TransactionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    transactionsFormService = TestBed.inject(TransactionsFormService);
    transactionsService = TestBed.inject(TransactionsService);
    bitcoinAddressService = TestBed.inject(BitcoinAddressService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call BitcoinAddress query and add missing value', () => {
      const transactions: ITransactions = { id: 456 };
      const bitcoinAddress: IBitcoinAddress = { id: 23080 };
      transactions.bitcoinAddress = bitcoinAddress;

      const bitcoinAddressCollection: IBitcoinAddress[] = [{ id: 7044 }];
      jest.spyOn(bitcoinAddressService, 'query').mockReturnValue(of(new HttpResponse({ body: bitcoinAddressCollection })));
      const additionalBitcoinAddresses = [bitcoinAddress];
      const expectedCollection: IBitcoinAddress[] = [...additionalBitcoinAddresses, ...bitcoinAddressCollection];
      jest.spyOn(bitcoinAddressService, 'addBitcoinAddressToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ transactions });
      comp.ngOnInit();

      expect(bitcoinAddressService.query).toHaveBeenCalled();
      expect(bitcoinAddressService.addBitcoinAddressToCollectionIfMissing).toHaveBeenCalledWith(
        bitcoinAddressCollection,
        ...additionalBitcoinAddresses.map(expect.objectContaining),
      );
      expect(comp.bitcoinAddressesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const transactions: ITransactions = { id: 456 };
      const bitcoinAddress: IBitcoinAddress = { id: 45 };
      transactions.bitcoinAddress = bitcoinAddress;

      activatedRoute.data = of({ transactions });
      comp.ngOnInit();

      expect(comp.bitcoinAddressesSharedCollection).toContain(bitcoinAddress);
      expect(comp.transactions).toEqual(transactions);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactions>>();
      const transactions = { id: 123 };
      jest.spyOn(transactionsFormService, 'getTransactions').mockReturnValue(transactions);
      jest.spyOn(transactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transactions }));
      saveSubject.complete();

      // THEN
      expect(transactionsFormService.getTransactions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(transactionsService.update).toHaveBeenCalledWith(expect.objectContaining(transactions));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactions>>();
      const transactions = { id: 123 };
      jest.spyOn(transactionsFormService, 'getTransactions').mockReturnValue({ id: null });
      jest.spyOn(transactionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transactions }));
      saveSubject.complete();

      // THEN
      expect(transactionsFormService.getTransactions).toHaveBeenCalled();
      expect(transactionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactions>>();
      const transactions = { id: 123 };
      jest.spyOn(transactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(transactionsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareBitcoinAddress', () => {
      it('Should forward to bitcoinAddressService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(bitcoinAddressService, 'compareBitcoinAddress');
        comp.compareBitcoinAddress(entity, entity2);
        expect(bitcoinAddressService.compareBitcoinAddress).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
