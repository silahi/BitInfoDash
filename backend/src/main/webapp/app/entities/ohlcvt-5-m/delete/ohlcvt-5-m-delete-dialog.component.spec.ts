jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { OHLCVT5mService } from '../service/ohlcvt-5-m.service';

import { OHLCVT5mDeleteDialogComponent } from './ohlcvt-5-m-delete-dialog.component';

describe('OHLCVT5m Management Delete Component', () => {
  let comp: OHLCVT5mDeleteDialogComponent;
  let fixture: ComponentFixture<OHLCVT5mDeleteDialogComponent>;
  let service: OHLCVT5mService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, OHLCVT5mDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(OHLCVT5mDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OHLCVT5mDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OHLCVT5mService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
