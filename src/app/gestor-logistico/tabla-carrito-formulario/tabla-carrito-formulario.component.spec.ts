import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCarritoFormularioComponent } from './tabla-carrito-formulario.component';

describe('TablaCarritoFormularioComponent', () => {
  let component: TablaCarritoFormularioComponent;
  let fixture: ComponentFixture<TablaCarritoFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaCarritoFormularioComponent]
    });
    fixture = TestBed.createComponent(TablaCarritoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
