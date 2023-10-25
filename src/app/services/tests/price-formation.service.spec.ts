import { TestBed } from '@angular/core/testing';
import { PriceFormationService } from '../price-formation.service';

describe('PriceFormationService', () => {
  let service: PriceFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
