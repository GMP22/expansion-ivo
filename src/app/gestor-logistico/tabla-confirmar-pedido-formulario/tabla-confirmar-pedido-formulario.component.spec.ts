import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaConfirmarPedidoFormularioComponent } from './tabla-confirmar-pedido-formulario.component';

describe('TablaConfirmarPedidoFormularioComponent', () => {
  let component: TablaConfirmarPedidoFormularioComponent;
  let fixture: ComponentFixture<TablaConfirmarPedidoFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaConfirmarPedidoFormularioComponent]
    });
    fixture = TestBed.createComponent(TablaConfirmarPedidoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
