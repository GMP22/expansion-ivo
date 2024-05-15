import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInventarioComponent } from './tabla-inventario.component';

describe('TablaInventarioComponent', () => {
  let component: TablaInventarioComponent;
  let fixture: ComponentFixture<TablaInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaInventarioComponent]
    });
    fixture = TestBed.createComponent(TablaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
