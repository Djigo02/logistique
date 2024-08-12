import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerCampusComponent } from './lister-campus.component';

describe('ListerCampusComponent', () => {
  let component: ListerCampusComponent;
  let fixture: ComponentFixture<ListerCampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerCampusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
