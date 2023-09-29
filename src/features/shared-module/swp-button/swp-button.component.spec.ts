import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwpButtonComponent } from './swp-button.component';

describe('SwpButtonComponent', () => {
  let component: SwpButtonComponent;
  let fixture: ComponentFixture<SwpButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwpButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
