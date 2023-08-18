import { TestBed } from '@angular/core/testing';

import { OrdreFabService } from './ordre-fab.service';

describe('OrdreFabService', () => {
  let service: OrdreFabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdreFabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
