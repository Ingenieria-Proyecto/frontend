import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlReservationComponent } from './control-reservation.component';

describe('ControlReservationComponent', () => {
  let component: ControlReservationComponent;
  let fixture: ComponentFixture<ControlReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
