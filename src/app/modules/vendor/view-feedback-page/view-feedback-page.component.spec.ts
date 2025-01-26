import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedbackPageComponent } from './view-feedback-page.component';

describe('ViewFeedbackPageComponent', () => {
  let component: ViewFeedbackPageComponent;
  let fixture: ComponentFixture<ViewFeedbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFeedbackPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFeedbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
