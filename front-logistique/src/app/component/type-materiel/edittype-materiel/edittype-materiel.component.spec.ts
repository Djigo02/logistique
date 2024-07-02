import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittypeMaterielComponent } from './edittype-materiel.component';

describe('EdittypeMaterielComponent', () => {
  let component: EdittypeMaterielComponent;
  let fixture: ComponentFixture<EdittypeMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittypeMaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittypeMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
