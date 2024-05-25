import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPedidosAceptadosComponent } from './tabla-pedidos-aceptados.component';

describe('TablaPedidosAceptadosComponent', () => {
  let component: TablaPedidosAceptadosComponent;
  let fixture: ComponentFixture<TablaPedidosAceptadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaPedidosAceptadosComponent]
    });
    fixture = TestBed.createComponent(TablaPedidosAceptadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
