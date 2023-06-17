import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlModalReservationComponent } from './control-modal-reservation.component';

describe('ControlModalReservationComponent', () => {
  let component: ControlModalReservationComponent;
  let fixture: ComponentFixture<ControlModalReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlModalReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlModalReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
