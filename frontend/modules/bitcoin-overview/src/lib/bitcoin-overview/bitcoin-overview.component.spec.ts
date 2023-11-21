import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitcoinOverviewComponent } from './bitcoin-overview.component';

describe('BitcoinOverviewComponent', () => {
  let component: BitcoinOverviewComponent;
  let fixture: ComponentFixture<BitcoinOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitcoinOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BitcoinOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
