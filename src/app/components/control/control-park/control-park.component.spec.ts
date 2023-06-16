import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlParkComponent } from './control-park.component';

describe('ControlParkComponent', () => {
  let component: ControlParkComponent;
  let fixture: ComponentFixture<ControlParkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlParkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
