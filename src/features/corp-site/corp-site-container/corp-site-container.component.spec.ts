import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpSiteContainerComponent } from './corp-site-container.component';

describe('CorpSiteContainerComponent', () => {
  let component: CorpSiteContainerComponent;
  let fixture: ComponentFixture<CorpSiteContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpSiteContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorpSiteContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
