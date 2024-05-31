import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPedidoMedicoComponent } from './detalles-pedido-medico.component';

describe('DetallesPedidoMedicoComponent', () => {
  let component: DetallesPedidoMedicoComponent;
  let fixture: ComponentFixture<DetallesPedidoMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesPedidoMedicoComponent]
    });
    fixture = TestBed.createComponent(DetallesPedidoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
