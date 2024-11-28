import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorHomePageComponent } from './vendor-home-page.component';

describe('VendorHomePageComponent', () => {
  let component: VendorHomePageComponent;
  let fixture: ComponentFixture<VendorHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
