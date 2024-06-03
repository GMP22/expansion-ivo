import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TresPasosFormularioComponent } from './tres-pasos-formulario.component';

describe('TresPasosFormularioComponent', () => {
  let component: TresPasosFormularioComponent;
  let fixture: ComponentFixture<TresPasosFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TresPasosFormularioComponent]
    });
    fixture = TestBed.createComponent(TresPasosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
