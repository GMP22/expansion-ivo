import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPedidoMedicoComponent } from './crear-pedido-medico.component';

describe('CrearPedidoMedicoComponent', () => {
  let component: CrearPedidoMedicoComponent;
  let fixture: ComponentFixture<CrearPedidoMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearPedidoMedicoComponent]
    });
    fixture = TestBed.createComponent(CrearPedidoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
