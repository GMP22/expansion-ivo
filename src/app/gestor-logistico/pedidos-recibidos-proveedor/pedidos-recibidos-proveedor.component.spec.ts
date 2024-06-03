import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosRecibidosProveedorComponent } from './pedidos-recibidos-proveedor.component';

describe('PedidosRecibidosProveedorComponent', () => {
  let component: PedidosRecibidosProveedorComponent;
  let fixture: ComponentFixture<PedidosRecibidosProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosRecibidosProveedorComponent]
    });
    fixture = TestBed.createComponent(PedidosRecibidosProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
