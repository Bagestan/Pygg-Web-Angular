import { TestBed } from '@angular/core/testing';

import { FireBirdService } from '../firebird.service';

describe('fireBirdService', () => {
  let service: FireBirdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireBirdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
