import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaArticulosFormularioMedicoComponent } from './tabla-articulos-formulario-medico.component';

describe('TablaArticulosFormularioMedicoComponent', () => {
  let component: TablaArticulosFormularioMedicoComponent;
  let fixture: ComponentFixture<TablaArticulosFormularioMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaArticulosFormularioMedicoComponent]
    });
    fixture = TestBed.createComponent(TablaArticulosFormularioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
