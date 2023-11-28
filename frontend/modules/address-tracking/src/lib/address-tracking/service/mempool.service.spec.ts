import { TestBed } from '@angular/core/testing';

import { MempoolService } from './mempool.service';

describe('MempoolService', () => {
  let service: MempoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MempoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
