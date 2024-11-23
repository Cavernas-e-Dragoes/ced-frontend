import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontariaComponent } from './montaria.component';

describe('MontariaComponent', () => {
  let component: MontariaComponent;
  let fixture: ComponentFixture<MontariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MontariaComponent]
    });
    fixture = TestBed.createComponent(MontariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
