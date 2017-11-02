import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SF1DetailComponent } from './sf1-detail.component';

describe('SF1DetailComponent', () => {
  let component: SF1DetailComponent;
  let fixture: ComponentFixture<SF1DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SF1DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SF1DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
