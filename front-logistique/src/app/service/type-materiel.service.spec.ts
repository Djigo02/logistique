import { TestBed } from '@angular/core/testing';

import { TypeMaterielService } from './type-materiel.service';

describe('TypeMaterielService', () => {
  let service: TypeMaterielService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMaterielService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
