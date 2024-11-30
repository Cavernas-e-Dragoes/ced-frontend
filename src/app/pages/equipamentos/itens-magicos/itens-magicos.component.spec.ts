import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensMagicosComponent } from './itens-magicos.component';

describe('ItensMagicosComponent', () => {
  let component: ItensMagicosComponent;
  let fixture: ComponentFixture<ItensMagicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItensMagicosComponent]
    });
    fixture = TestBed.createComponent(ItensMagicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
