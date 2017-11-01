import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1Component } from './sf1.component';

describe('Sf1Component', () => {
  let component: Sf1Component;
  let fixture: ComponentFixture<Sf1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
