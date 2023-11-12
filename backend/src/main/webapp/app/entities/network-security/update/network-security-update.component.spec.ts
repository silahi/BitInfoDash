import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NetworkSecurityService } from '../service/network-security.service';
import { INetworkSecurity } from '../network-security.model';
import { NetworkSecurityFormService } from './network-security-form.service';

import { NetworkSecurityUpdateComponent } from './network-security-update.component';

describe('NetworkSecurity Management Update Component', () => {
  let comp: NetworkSecurityUpdateComponent;
  let fixture: ComponentFixture<NetworkSecurityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let networkSecurityFormService: NetworkSecurityFormService;
  let networkSecurityService: NetworkSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), NetworkSecurityUpdateComponent],
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
      .overrideTemplate(NetworkSecurityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NetworkSecurityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    networkSecurityFormService = TestBed.inject(NetworkSecurityFormService);
    networkSecurityService = TestBed.inject(NetworkSecurityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const networkSecurity: INetworkSecurity = { id: 456 };

      activatedRoute.data = of({ networkSecurity });
      comp.ngOnInit();

      expect(comp.networkSecurity).toEqual(networkSecurity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INetworkSecurity>>();
      const networkSecurity = { id: 123 };
      jest.spyOn(networkSecurityFormService, 'getNetworkSecurity').mockReturnValue(networkSecurity);
      jest.spyOn(networkSecurityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ networkSecurity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: networkSecurity }));
      saveSubject.complete();

      // THEN
      expect(networkSecurityFormService.getNetworkSecurity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(networkSecurityService.update).toHaveBeenCalledWith(expect.objectContaining(networkSecurity));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INetworkSecurity>>();
      const networkSecurity = { id: 123 };
      jest.spyOn(networkSecurityFormService, 'getNetworkSecurity').mockReturnValue({ id: null });
      jest.spyOn(networkSecurityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ networkSecurity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: networkSecurity }));
      saveSubject.complete();

      // THEN
      expect(networkSecurityFormService.getNetworkSecurity).toHaveBeenCalled();
      expect(networkSecurityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INetworkSecurity>>();
      const networkSecurity = { id: 123 };
      jest.spyOn(networkSecurityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ networkSecurity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(networkSecurityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
