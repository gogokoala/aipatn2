import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTextComponent } from './full-text.component';

describe('FullTextComponent', () => {
  let component: FullTextComponent;
  let fixture: ComponentFixture<FullTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
