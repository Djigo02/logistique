import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerMaterielComponent } from './lister-materiel.component';

describe('ListerMaterielComponent', () => {
  let component: ListerMaterielComponent;
  let fixture: ComponentFixture<ListerMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerMaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
