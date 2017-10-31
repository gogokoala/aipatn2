import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentResultComponent } from './patent-result.component';

describe('PatentResultComponent', () => {
  let component: PatentResultComponent;
  let fixture: ComponentFixture<PatentResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
