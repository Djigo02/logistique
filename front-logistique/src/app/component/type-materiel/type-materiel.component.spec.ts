import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMaterielComponent } from './type-materiel.component';

describe('TypeMaterielComponent', () => {
  let component: TypeMaterielComponent;
  let fixture: ComponentFixture<TypeMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
