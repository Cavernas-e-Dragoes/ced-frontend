import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontariasEVeiculosComponent } from './montarias-e-veiculos.component';

describe('MontariasEVeiculosComponent', () => {
  let component: MontariasEVeiculosComponent;
  let fixture: ComponentFixture<MontariasEVeiculosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MontariasEVeiculosComponent]
    });
    fixture = TestBed.createComponent(MontariasEVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
