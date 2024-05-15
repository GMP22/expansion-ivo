import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSolicitudesEntrantesComponent } from './tabla-solicitudes-entrantes.component';

describe('TablaSolicitudesEntrantesComponent', () => {
  let component: TablaSolicitudesEntrantesComponent;
  let fixture: ComponentFixture<TablaSolicitudesEntrantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaSolicitudesEntrantesComponent]
    });
    fixture = TestBed.createComponent(TablaSolicitudesEntrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
