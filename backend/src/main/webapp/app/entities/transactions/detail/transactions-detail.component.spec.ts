import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TransactionsDetailComponent } from './transactions-detail.component';

describe('Transactions Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TransactionsDetailComponent,
              resolve: { transactions: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TransactionsDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load transactions on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TransactionsDetailComponent);

      // THEN
      expect(instance.transactions).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
