jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { OHLCVT1hService } from '../service/ohlcvt-1-h.service';

import { OHLCVT1hDeleteDialogComponent } from './ohlcvt-1-h-delete-dialog.component';

describe('OHLCVT1h Management Delete Component', () => {
  let comp: OHLCVT1hDeleteDialogComponent;
  let fixture: ComponentFixture<OHLCVT1hDeleteDialogComponent>;
  let service: OHLCVT1hService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, OHLCVT1hDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(OHLCVT1hDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OHLCVT1hDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OHLCVT1hService);
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
