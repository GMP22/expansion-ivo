import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSolicitudesHistorialComponent } from './tabla-solicitudes-historial.component';

describe('TablaSolicitudesHistorialComponent', () => {
  let component: TablaSolicitudesHistorialComponent;
  let fixture: ComponentFixture<TablaSolicitudesHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaSolicitudesHistorialComponent]
    });
    fixture = TestBed.createComponent(TablaSolicitudesHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
