import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChargingStationComponent } from './edit-charging-station.component';

describe('EditChargingStationComponent', () => {
  let component: EditChargingStationComponent;
  let fixture: ComponentFixture<EditChargingStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditChargingStationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditChargingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
