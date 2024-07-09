import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCampusComponent } from './form-campus.component';

describe('FormCampusComponent', () => {
  let component: FormCampusComponent;
  let fixture: ComponentFixture<FormCampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCampusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
