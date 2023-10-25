import { Injectable } from '@angular/core';
import { Customer, Product, ProductCost, Taxes } from './shared/types';

@Injectable({
  providedIn: 'root',
})
export class PriceFormationService {
  product!: Product;
  customer!: Customer;
  productTaxes!: Taxes;
  productCost!: ProductCost;

  constructor() {}
}
