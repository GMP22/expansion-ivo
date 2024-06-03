import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPendientesProveedorComponent } from './pedidos-pendientes-proveedor.component';

describe('PedidosPendientesProveedorComponent', () => {
  let component: PedidosPendientesProveedorComponent;
  let fixture: ComponentFixture<PedidosPendientesProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosPendientesProveedorComponent]
    });
    fixture = TestBed.createComponent(PedidosPendientesProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
