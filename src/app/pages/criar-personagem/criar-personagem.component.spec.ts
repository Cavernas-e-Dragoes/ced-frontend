import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPersonagemComponent } from './criar-personagem.component';

describe('CriarPersonagemComponent', () => {
  let component: CriarPersonagemComponent;
  let fixture: ComponentFixture<CriarPersonagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarPersonagemComponent]
    });
    fixture = TestBed.createComponent(CriarPersonagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
