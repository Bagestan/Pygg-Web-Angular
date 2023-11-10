import { Injectable } from '@angular/core';
import { FirebirdService } from './firebird.service';
import { Customer, Product } from './shared/types';

@Injectable({
  providedIn: 'root',
})
export class PriceFormationService {
  product!: Product;
  customer!: Customer;
  productImg!: any;

  constructor(private firebird: FirebirdService) {}
}
