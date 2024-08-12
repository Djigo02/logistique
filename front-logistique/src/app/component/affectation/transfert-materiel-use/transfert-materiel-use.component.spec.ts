import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertMaterielUseComponent } from './transfert-materiel-use.component';

describe('TransfertMaterielUseComponent', () => {
  let component: TransfertMaterielUseComponent;
  let fixture: ComponentFixture<TransfertMaterielUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertMaterielUseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfertMaterielUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
