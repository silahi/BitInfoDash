import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockchainAnalysisComponent } from './blockchain-analysis.component';

describe('BlockchainAnalysisComponent', () => {
  let component: BlockchainAnalysisComponent;
  let fixture: ComponentFixture<BlockchainAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockchainAnalysisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockchainAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
