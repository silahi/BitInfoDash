import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { NetworkSecurityDetailComponent } from './network-security-detail.component';

describe('NetworkSecurity Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkSecurityDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: NetworkSecurityDetailComponent,
              resolve: { networkSecurity: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(NetworkSecurityDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load networkSecurity on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', NetworkSecurityDetailComponent);

      // THEN
      expect(instance.networkSecurity).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
