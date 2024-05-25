import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCarritoFormularioMedicoComponent } from './tabla-carrito-formulario-medico.component';

describe('TablaCarritoFormularioMedicoComponent', () => {
  let component: TablaCarritoFormularioMedicoComponent;
  let fixture: ComponentFixture<TablaCarritoFormularioMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaCarritoFormularioMedicoComponent]
    });
    fixture = TestBed.createComponent(TablaCarritoFormularioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
