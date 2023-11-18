import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OHLCVT1dDetailComponent } from './ohlcvt-1-d-detail.component';

describe('OHLCVT1d Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OHLCVT1dDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: OHLCVT1dDetailComponent,
              resolve: { oHLCVT1d: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(OHLCVT1dDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load oHLCVT1d on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', OHLCVT1dDetailComponent);

      // THEN
      expect(instance.oHLCVT1d).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
