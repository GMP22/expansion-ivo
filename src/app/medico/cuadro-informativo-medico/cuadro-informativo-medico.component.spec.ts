import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroInformativoMedicoComponent } from './cuadro-informativo-medico.component';

describe('CuadroInformativoMedicoComponent', () => {
  let component: CuadroInformativoMedicoComponent;
  let fixture: ComponentFixture<CuadroInformativoMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadroInformativoMedicoComponent]
    });
    fixture = TestBed.createComponent(CuadroInformativoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
