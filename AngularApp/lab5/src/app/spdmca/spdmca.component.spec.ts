import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPDMCAComponent } from './spdmca.component';

describe('SPDMCAComponent', () => {
  let component: SPDMCAComponent;
  let fixture: ComponentFixture<SPDMCAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SPDMCAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPDMCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
