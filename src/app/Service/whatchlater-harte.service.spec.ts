import { TestBed } from '@angular/core/testing';

import { WhatchlaterHarteService } from './whatchlater-harte.service';

describe('WhatchlaterHarteService', () => {
  let service: WhatchlaterHarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatchlaterHarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
