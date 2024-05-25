import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosPasosFormularioMedicoComponent } from './dos-pasos-formulario-medico.component';

describe('DosPasosFormularioMedicoComponent', () => {
  let component: DosPasosFormularioMedicoComponent;
  let fixture: ComponentFixture<DosPasosFormularioMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DosPasosFormularioMedicoComponent]
    });
    fixture = TestBed.createComponent(DosPasosFormularioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
