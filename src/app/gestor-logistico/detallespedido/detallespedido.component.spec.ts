import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallespedidoComponent } from './detallespedido.component';

describe('DetallespedidoComponent', () => {
  let component: DetallespedidoComponent;
  let fixture: ComponentFixture<DetallespedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallespedidoComponent]
    });
    fixture = TestBed.createComponent(DetallespedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
