import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParksComponent } from './list-parks.component';

describe('ListParksComponent', () => {
  let component: ListParksComponent;
  let fixture: ComponentFixture<ListParksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListParksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
