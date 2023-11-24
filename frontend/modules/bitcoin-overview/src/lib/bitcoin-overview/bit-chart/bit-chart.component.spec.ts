import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitChartComponent } from './bit-chart.component';

describe('BitChartComponent', () => {
  let component: BitChartComponent;
  let fixture: ComponentFixture<BitChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BitChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
