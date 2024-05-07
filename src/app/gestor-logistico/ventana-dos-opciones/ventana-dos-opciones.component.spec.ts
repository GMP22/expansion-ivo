import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaDosOpcionesComponent } from './ventana-dos-opciones.component';

describe('VentanaDosOpcionesComponent', () => {
  let component: VentanaDosOpcionesComponent;
  let fixture: ComponentFixture<VentanaDosOpcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaDosOpcionesComponent]
    });
    fixture = TestBed.createComponent(VentanaDosOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
