import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertMaterielComponent } from './transfert-materiel.component';

describe('TransfertMaterielComponent', () => {
  let component: TransfertMaterielComponent;
  let fixture: ComponentFixture<TransfertMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertMaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfertMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
