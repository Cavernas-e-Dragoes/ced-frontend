import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagiasComponent } from './magias.component';

describe('MagiasComponent', () => {
  let component: MagiasComponent;
  let fixture: ComponentFixture<MagiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagiasComponent]
    });
    fixture = TestBed.createComponent(MagiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
