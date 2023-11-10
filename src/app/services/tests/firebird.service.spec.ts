import { TestBed } from '@angular/core/testing';
import { FirebirdService } from '../firebird.service';

describe('fireBirdService', () => {
  let service: FirebirdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebirdService);
  });
  s;

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
