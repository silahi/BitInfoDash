jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { OHLCVT12hService } from '../service/ohlcvt-12-h.service';

import { OHLCVT12hDeleteDialogComponent } from './ohlcvt-12-h-delete-dialog.component';

describe('OHLCVT12h Management Delete Component', () => {
  let comp: OHLCVT12hDeleteDialogComponent;
  let fixture: ComponentFixture<OHLCVT12hDeleteDialogComponent>;
  let service: OHLCVT12hService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, OHLCVT12hDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(OHLCVT12hDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OHLCVT12hDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OHLCVT12hService);
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
