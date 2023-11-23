import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitcoinInfoComponent } from './bitcoin-info.component';

describe('BitcoinInfoComponent', () => {
  let component: BitcoinInfoComponent;
  let fixture: ComponentFixture<BitcoinInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitcoinInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BitcoinInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
