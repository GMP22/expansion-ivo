import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroInformativoComponent } from './cuadro-informativo.component';

describe('CuadroInformativoComponent', () => {
  let component: CuadroInformativoComponent;
  let fixture: ComponentFixture<CuadroInformativoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadroInformativoComponent]
    });
    fixture = TestBed.createComponent(CuadroInformativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
