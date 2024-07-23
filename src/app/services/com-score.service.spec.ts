import { TestBed } from '@angular/core/testing';

import { ComScoreService } from './com-score.service';

describe('ComScoreService', () => {
  let service: ComScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
