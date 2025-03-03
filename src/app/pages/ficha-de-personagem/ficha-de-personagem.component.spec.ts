import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDePersonagemComponent } from './ficha-de-personagem.component';

describe('FichaDePersonagemComponent', () => {
  let component: FichaDePersonagemComponent;
  let fixture: ComponentFixture<FichaDePersonagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichaDePersonagemComponent]
    });
    fixture = TestBed.createComponent(FichaDePersonagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
