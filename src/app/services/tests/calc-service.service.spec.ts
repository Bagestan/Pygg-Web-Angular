import { TestBed } from '@angular/core/testing';
import { CalcServiceService } from '../calc-service.service';

describe('CalcServiceService', () => {
  let service: CalcServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
