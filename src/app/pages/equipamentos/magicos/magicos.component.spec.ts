import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicosComponent } from './magicos.component';

describe('MagicosComponent', () => {
  let component: MagicosComponent;
  let fixture: ComponentFixture<MagicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagicosComponent]
    });
    fixture = TestBed.createComponent(MagicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
