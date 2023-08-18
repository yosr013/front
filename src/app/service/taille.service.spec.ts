import { TestBed } from '@angular/core/testing';

import { TailleService } from './taille.service';

describe('TailleService', () => {
  let service: TailleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TailleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
