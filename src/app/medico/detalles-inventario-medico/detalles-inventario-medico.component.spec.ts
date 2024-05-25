import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesInventarioMedicoComponent } from './detalles-inventario-medico.component';

describe('DetallesInventarioMedicoComponent', () => {
  let component: DetallesInventarioMedicoComponent;
  let fixture: ComponentFixture<DetallesInventarioMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesInventarioMedicoComponent]
    });
    fixture = TestBed.createComponent(DetallesInventarioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
