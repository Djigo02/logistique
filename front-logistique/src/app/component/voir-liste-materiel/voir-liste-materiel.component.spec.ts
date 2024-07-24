import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirListeMaterielComponent } from './voir-liste-materiel.component';

describe('VoirListeMaterielComponent', () => {
  let component: VoirListeMaterielComponent;
  let fixture: ComponentFixture<VoirListeMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirListeMaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirListeMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
