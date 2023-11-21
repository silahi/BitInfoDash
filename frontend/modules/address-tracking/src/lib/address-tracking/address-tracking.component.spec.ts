import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressTrackingComponent } from './address-tracking.component';

describe('AddressTrackingComponent', () => {
  let component: AddressTrackingComponent;
  let fixture: ComponentFixture<AddressTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressTrackingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
