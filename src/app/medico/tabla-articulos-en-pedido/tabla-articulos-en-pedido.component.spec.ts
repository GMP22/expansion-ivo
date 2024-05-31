import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaArticulosEnPedidoComponent } from './tabla-articulos-en-pedido.component';

describe('TablaArticulosEnPedidoComponent', () => {
  let component: TablaArticulosEnPedidoComponent;
  let fixture: ComponentFixture<TablaArticulosEnPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaArticulosEnPedidoComponent]
    });
    fixture = TestBed.createComponent(TablaArticulosEnPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
