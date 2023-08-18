import { TestBed } from '@angular/core/testing';

import { ChaineService } from './chaine.service';

describe('ChaineService', () => {
  let service: ChaineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChaineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
