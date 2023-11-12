import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MarketTrendsDetailComponent } from './market-trends-detail.component';

describe('MarketTrends Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketTrendsDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: MarketTrendsDetailComponent,
              resolve: { marketTrends: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(MarketTrendsDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load marketTrends on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', MarketTrendsDetailComponent);

      // THEN
      expect(instance.marketTrends).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
