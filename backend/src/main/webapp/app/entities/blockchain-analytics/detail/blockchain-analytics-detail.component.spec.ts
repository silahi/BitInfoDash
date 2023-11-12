import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BlockchainAnalyticsDetailComponent } from './blockchain-analytics-detail.component';

describe('BlockchainAnalytics Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockchainAnalyticsDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: BlockchainAnalyticsDetailComponent,
              resolve: { blockchainAnalytics: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(BlockchainAnalyticsDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load blockchainAnalytics on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', BlockchainAnalyticsDetailComponent);

      // THEN
      expect(instance.blockchainAnalytics).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
