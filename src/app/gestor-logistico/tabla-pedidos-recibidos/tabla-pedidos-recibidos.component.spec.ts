import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPedidosRecibidosComponent } from './tabla-pedidos-recibidos.component';

describe('TablaPedidosRecibidosComponent', () => {
  let component: TablaPedidosRecibidosComponent;
  let fixture: ComponentFixture<TablaPedidosRecibidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaPedidosRecibidosComponent]
    });
    fixture = TestBed.createComponent(TablaPedidosRecibidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
