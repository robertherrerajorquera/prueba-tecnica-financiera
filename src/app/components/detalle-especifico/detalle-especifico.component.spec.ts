import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEspecificoComponent } from './detalle-especifico.component';

describe('DetalleEspecificoComponent', () => {
  let component: DetalleEspecificoComponent;
  let fixture: ComponentFixture<DetalleEspecificoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleEspecificoComponent]
    });
    fixture = TestBed.createComponent(DetalleEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
