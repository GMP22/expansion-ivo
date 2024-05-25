import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaDosOpcionesMedicoComponent } from './ventana-dos-opciones-medico.component';

describe('VentanaDosOpcionesMedicoComponent', () => {
  let component: VentanaDosOpcionesMedicoComponent;
  let fixture: ComponentFixture<VentanaDosOpcionesMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaDosOpcionesMedicoComponent]
    });
    fixture = TestBed.createComponent(VentanaDosOpcionesMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
