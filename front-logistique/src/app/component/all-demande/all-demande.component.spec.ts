import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDemandeComponent } from './all-demande.component';

describe('AllDemandeComponent', () => {
  let component: AllDemandeComponent;
  let fixture: ComponentFixture<AllDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
