import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosPasosFormularioComponent } from './dos-pasos-formulario.component';

describe('DosPasosFormularioComponent', () => {
  let component: DosPasosFormularioComponent;
  let fixture: ComponentFixture<DosPasosFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DosPasosFormularioComponent]
    });
    fixture = TestBed.createComponent(DosPasosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
