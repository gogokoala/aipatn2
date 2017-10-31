import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentComponent } from './patent.component';

describe('PatentComponent', () => {
  let component: PatentComponent;
  let fixture: ComponentFixture<PatentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
