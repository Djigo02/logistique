import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAffectationComponent } from './user-affectation.component';

describe('UserAffectationComponent', () => {
  let component: UserAffectationComponent;
  let fixture: ComponentFixture<UserAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAffectationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
