import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SF1ListComponent } from './sf1-list.component';

describe('SearchResultComponent', () => {
  let component: SF1ListComponent;
  let fixture: ComponentFixture<SF1ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SF1ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SF1ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
