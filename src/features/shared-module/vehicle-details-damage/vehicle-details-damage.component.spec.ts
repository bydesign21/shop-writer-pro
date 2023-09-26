import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsDamageComponent } from './vehicle-details-damage.component';

describe('VehicleDetailsDamageComponent', () => {
  let component: VehicleDetailsDamageComponent;
  let fixture: ComponentFixture<VehicleDetailsDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleDetailsDamageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleDetailsDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
