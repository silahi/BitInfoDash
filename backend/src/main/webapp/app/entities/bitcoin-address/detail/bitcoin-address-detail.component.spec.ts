import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BitcoinAddressDetailComponent } from './bitcoin-address-detail.component';

describe('BitcoinAddress Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitcoinAddressDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: BitcoinAddressDetailComponent,
              resolve: { bitcoinAddress: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(BitcoinAddressDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load bitcoinAddress on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', BitcoinAddressDetailComponent);

      // THEN
      expect(instance.bitcoinAddress).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
