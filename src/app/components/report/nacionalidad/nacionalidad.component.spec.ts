import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NacionalidadComponent } from './nacionalidad.component';

describe('NacionalidadComponent', () => {
  let component: NacionalidadComponent;
  let fixture: ComponentFixture<NacionalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NacionalidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NacionalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
