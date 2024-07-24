import { TestBed } from '@angular/core/testing';

import { VoirListeMaterielService } from './voir-liste-materiel.service';

describe('VoirListeMaterielService', () => {
  let service: VoirListeMaterielService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoirListeMaterielService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
