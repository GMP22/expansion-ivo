import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaArticulosFormularioComponent } from './tabla-articulos-formulario.component';

describe('TablaArticulosFormularioComponent', () => {
  let component: TablaArticulosFormularioComponent;
  let fixture: ComponentFixture<TablaArticulosFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaArticulosFormularioComponent]
    });
    fixture = TestBed.createComponent(TablaArticulosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
