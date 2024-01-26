import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateReportProcessingComponent } from './initiate-report-processing.component';

describe('InitiateReportProcessingComponent', () => {
  let component: InitiateReportProcessingComponent;
  let fixture: ComponentFixture<InitiateReportProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitiateReportProcessingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitiateReportProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
