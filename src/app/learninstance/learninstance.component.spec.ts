import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearninstanceComponent } from './learninstance.component';

describe('LearninstanceComponent', () => {
  let component: LearninstanceComponent;
  let fixture: ComponentFixture<LearninstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearninstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearninstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
