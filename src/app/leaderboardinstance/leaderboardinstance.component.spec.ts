import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardinstanceComponent } from './leaderboardinstance.component';

describe('LeaderboardinstanceComponent', () => {
  let component: LeaderboardinstanceComponent;
  let fixture: ComponentFixture<LeaderboardinstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardinstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardinstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
