import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPedidosPendientesComponent } from './tabla-pedidos-pendientes.component';

describe('TablaPedidosPendientesComponent', () => {
  let component: TablaPedidosPendientesComponent;
  let fixture: ComponentFixture<TablaPedidosPendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaPedidosPendientesComponent]
    });
    fixture = TestBed.createComponent(TablaPedidosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
