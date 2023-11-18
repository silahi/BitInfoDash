import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OHLCVT5mDetailComponent } from './ohlcvt-5-m-detail.component';

describe('OHLCVT5m Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OHLCVT5mDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: OHLCVT5mDetailComponent,
              resolve: { oHLCVT5m: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(OHLCVT5mDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load oHLCVT5m on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', OHLCVT5mDetailComponent);

      // THEN
      expect(instance.oHLCVT5m).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
