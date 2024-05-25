import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaConfirmarPedidoFormularioMedicoComponent } from './tabla-confirmar-pedido-formulario-medico.component';

describe('TablaConfirmarPedidoFormularioMedicoComponent', () => {
  let component: TablaConfirmarPedidoFormularioMedicoComponent;
  let fixture: ComponentFixture<TablaConfirmarPedidoFormularioMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaConfirmarPedidoFormularioMedicoComponent]
    });
    fixture = TestBed.createComponent(TablaConfirmarPedidoFormularioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
