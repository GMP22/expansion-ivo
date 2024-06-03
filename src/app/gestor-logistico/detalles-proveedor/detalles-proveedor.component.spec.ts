import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesProveedorComponent } from './detalles-proveedor.component';

describe('DetallesProveedorComponent', () => {
  let component: DetallesProveedorComponent;
  let fixture: ComponentFixture<DetallesProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesProveedorComponent]
    });
    fixture = TestBed.createComponent(DetallesProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
