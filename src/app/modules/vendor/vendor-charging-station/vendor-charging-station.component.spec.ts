import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorChargingStationComponent } from './vendor-charging-station.component';

describe('VendorChargingStationComponent', () => {
  let component: VendorChargingStationComponent;
  let fixture: ComponentFixture<VendorChargingStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorChargingStationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorChargingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
