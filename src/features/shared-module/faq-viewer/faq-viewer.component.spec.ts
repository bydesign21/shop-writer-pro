import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqViewerComponent } from './faq-viewer.component';

describe('FaqViewerComponent', () => {
  let component: FaqViewerComponent;
  let fixture: ComponentFixture<FaqViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
