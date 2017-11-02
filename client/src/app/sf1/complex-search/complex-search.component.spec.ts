import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexSearchComponent } from './complex-search.component';

describe('ComplexSearchComponent', () => {
  let component: ComplexSearchComponent;
  let fixture: ComponentFixture<ComplexSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
