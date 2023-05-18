import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRateComponent } from './add-edit-rate.component';

describe('AddEditRateComponent', () => {
  let component: AddEditRateComponent;
  let fixture: ComponentFixture<AddEditRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
