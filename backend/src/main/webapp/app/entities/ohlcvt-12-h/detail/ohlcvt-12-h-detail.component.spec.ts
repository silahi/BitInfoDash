import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OHLCVT12hDetailComponent } from './ohlcvt-12-h-detail.component';

describe('OHLCVT12h Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OHLCVT12hDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: OHLCVT12hDetailComponent,
              resolve: { oHLCVT12h: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(OHLCVT12hDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load oHLCVT12h on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', OHLCVT12hDetailComponent);

      // THEN
      expect(instance.oHLCVT12h).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
