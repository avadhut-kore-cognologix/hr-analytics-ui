import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownErrorPageComponent } from './unknown-error-page.component';

describe('UnknownErrorPageComponent', () => {
  let component: UnknownErrorPageComponent;
  let fixture: ComponentFixture<UnknownErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnknownErrorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnknownErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
