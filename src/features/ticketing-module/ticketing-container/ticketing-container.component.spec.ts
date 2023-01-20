import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingContainerComponent } from './ticketing-container.component';

describe('TicketingContainerComponent', () => {
  let component: TicketingContainerComponent;
  let fixture: ComponentFixture<TicketingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketingContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
