import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaguaoDoAventureiroComponent } from './saguao-do-aventureiro.component';

describe('SaguaoDoAventureiroComponent', () => {
  let component: SaguaoDoAventureiroComponent;
  let fixture: ComponentFixture<SaguaoDoAventureiroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaguaoDoAventureiroComponent]
    });
    fixture = TestBed.createComponent(SaguaoDoAventureiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
