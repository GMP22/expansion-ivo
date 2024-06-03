import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProveedoresComponent } from './crear-proveedores.component';

describe('CrearProveedoresComponent', () => {
  let component: CrearProveedoresComponent;
  let fixture: ComponentFixture<CrearProveedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearProveedoresComponent]
    });
    fixture = TestBed.createComponent(CrearProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
