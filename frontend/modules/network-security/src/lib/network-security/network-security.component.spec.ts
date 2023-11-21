import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkSecurityComponent } from './network-security.component';

describe('NetworkSecurityComponent', () => {
  let component: NetworkSecurityComponent;
  let fixture: ComponentFixture<NetworkSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkSecurityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
