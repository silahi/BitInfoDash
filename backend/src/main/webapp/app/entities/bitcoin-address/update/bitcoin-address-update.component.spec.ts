import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BitcoinAddressService } from '../service/bitcoin-address.service';
import { IBitcoinAddress } from '../bitcoin-address.model';
import { BitcoinAddressFormService } from './bitcoin-address-form.service';

import { BitcoinAddressUpdateComponent } from './bitcoin-address-update.component';

describe('BitcoinAddress Management Update Component', () => {
  let comp: BitcoinAddressUpdateComponent;
  let fixture: ComponentFixture<BitcoinAddressUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bitcoinAddressFormService: BitcoinAddressFormService;
  let bitcoinAddressService: BitcoinAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), BitcoinAddressUpdateComponent],
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
      .overrideTemplate(BitcoinAddressUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BitcoinAddressUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bitcoinAddressFormService = TestBed.inject(BitcoinAddressFormService);
    bitcoinAddressService = TestBed.inject(BitcoinAddressService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const bitcoinAddress: IBitcoinAddress = { id: 456 };

      activatedRoute.data = of({ bitcoinAddress });
      comp.ngOnInit();

      expect(comp.bitcoinAddress).toEqual(bitcoinAddress);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBitcoinAddress>>();
      const bitcoinAddress = { id: 123 };
      jest.spyOn(bitcoinAddressFormService, 'getBitcoinAddress').mockReturnValue(bitcoinAddress);
      jest.spyOn(bitcoinAddressService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bitcoinAddress });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bitcoinAddress }));
      saveSubject.complete();

      // THEN
      expect(bitcoinAddressFormService.getBitcoinAddress).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bitcoinAddressService.update).toHaveBeenCalledWith(expect.objectContaining(bitcoinAddress));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBitcoinAddress>>();
      const bitcoinAddress = { id: 123 };
      jest.spyOn(bitcoinAddressFormService, 'getBitcoinAddress').mockReturnValue({ id: null });
      jest.spyOn(bitcoinAddressService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bitcoinAddress: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bitcoinAddress }));
      saveSubject.complete();

      // THEN
      expect(bitcoinAddressFormService.getBitcoinAddress).toHaveBeenCalled();
      expect(bitcoinAddressService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBitcoinAddress>>();
      const bitcoinAddress = { id: 123 };
      jest.spyOn(bitcoinAddressService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bitcoinAddress });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bitcoinAddressService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
