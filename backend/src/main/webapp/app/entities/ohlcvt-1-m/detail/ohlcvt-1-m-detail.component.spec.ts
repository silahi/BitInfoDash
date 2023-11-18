import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OHLCVT1mDetailComponent } from './ohlcvt-1-m-detail.component';

describe('OHLCVT1m Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OHLCVT1mDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: OHLCVT1mDetailComponent,
              resolve: { oHLCVT1m: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(OHLCVT1mDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load oHLCVT1m on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', OHLCVT1mDetailComponent);

      // THEN
      expect(instance.oHLCVT1m).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
