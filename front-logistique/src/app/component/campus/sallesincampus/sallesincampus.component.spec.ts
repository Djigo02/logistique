import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SallesincampusComponent } from './sallesincampus.component';

describe('SallesincampusComponent', () => {
  let component: SallesincampusComponent;
  let fixture: ComponentFixture<SallesincampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SallesincampusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SallesincampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
