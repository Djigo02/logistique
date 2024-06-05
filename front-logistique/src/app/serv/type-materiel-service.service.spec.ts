import { TestBed } from '@angular/core/testing';

import { TypeMaterielServiceService } from './type-materiel-service.service';

describe('TypeMaterielServiceService', () => {
  let service: TypeMaterielServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMaterielServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
