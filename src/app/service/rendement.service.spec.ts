import { TestBed } from '@angular/core/testing';

import { RendementService } from './rendement.service';

describe('RendementService', () => {
  let service: RendementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
