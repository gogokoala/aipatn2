import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalInstrumentsComponent } from './legal-instruments.component';

describe('LegalInstrumentsComponent', () => {
  let component: LegalInstrumentsComponent;
  let fixture: ComponentFixture<LegalInstrumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalInstrumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalInstrumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
