import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesArticuloInventarioComponent } from './detalles-articulo-inventario.component';

describe('DetallesArticuloInventarioComponent', () => {
  let component: DetallesArticuloInventarioComponent;
  let fixture: ComponentFixture<DetallesArticuloInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesArticuloInventarioComponent]
    });
    fixture = TestBed.createComponent(DetallesArticuloInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
