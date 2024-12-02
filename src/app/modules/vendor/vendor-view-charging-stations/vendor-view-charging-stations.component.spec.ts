import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorViewChargingStationsComponent } from './vendor-view-charging-stations.component';

describe('VendorViewChargingStationsComponent', () => {
  let component: VendorViewChargingStationsComponent;
  let fixture: ComponentFixture<VendorViewChargingStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorViewChargingStationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorViewChargingStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
