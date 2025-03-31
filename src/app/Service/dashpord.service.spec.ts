import { TestBed } from '@angular/core/testing';

import { DashpordService } from './dashpord.service';

describe('DashpordService', () => {
  let service: DashpordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashpordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
