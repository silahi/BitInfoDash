import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BitcoinOverviewDetailComponent } from './bitcoin-overview-detail.component';

describe('BitcoinOverview Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitcoinOverviewDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: BitcoinOverviewDetailComponent,
              resolve: { bitcoinOverview: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(BitcoinOverviewDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load bitcoinOverview on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', BitcoinOverviewDetailComponent);

      // THEN
      expect(instance.bitcoinOverview).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
