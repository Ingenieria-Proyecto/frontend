import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeListComponent } from './administrative-list.component';

describe('AdministrativeListComponent', () => {
  let component: AdministrativeListComponent;
  let fixture: ComponentFixture<AdministrativeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrativeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
