import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchsongComponent } from './searchsong.component';

describe('SearchsongComponent', () => {
  let component: SearchsongComponent;
  let fixture: ComponentFixture<SearchsongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchsongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
