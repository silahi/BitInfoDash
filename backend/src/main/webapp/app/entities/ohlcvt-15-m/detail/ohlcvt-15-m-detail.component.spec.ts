import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OHLCVT15mDetailComponent } from './ohlcvt-15-m-detail.component';

describe('OHLCVT15m Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OHLCVT15mDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: OHLCVT15mDetailComponent,
              resolve: { oHLCVT15m: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(OHLCVT15mDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load oHLCVT15m on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', OHLCVT15mDetailComponent);

      // THEN
      expect(instance.oHLCVT15m).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
