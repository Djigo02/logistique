import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypematerielComponent } from './liste-typemateriel.component';

describe('ListeTypematerielComponent', () => {
  let component: ListeTypematerielComponent;
  let fixture: ComponentFixture<ListeTypematerielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTypematerielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTypematerielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
