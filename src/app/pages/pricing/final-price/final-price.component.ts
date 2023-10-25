import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireBirdService } from 'src/app/services/firebird.service';
import { PriceFormationService } from 'src/app/services/price-formation.service';
import {
  Customer,
  Product,
  ProductCost,
  Taxes,
} from 'src/app/services/shared/types';

@Component({
  selector: 'app-final-price',
  templateUrl: './final-price.component.html',
  styleUrls: ['./final-price.component.scss'],
})
export class FinalPriceComponent {
  product!: Product;
  customer!: Customer;
  productTaxes!: Taxes;
  productCost!: ProductCost;

  constructor(
    private firebirdService: FireBirdService,
    private priceService: PriceFormationService,
    private router: Router
  ) {
    this.product = this.priceService.product;

    if (this.product) {
      this.getTaxes();
      console.log(this.priceService.product);
      console.log(this.priceService.customer);
      console.log(this.priceService.productCost);
    } else {
      this.router.navigate(['main/pricing']);
    }
  }

  getTaxes() {
    this.firebirdService
      .getTaxes(this.priceService.customer.id)
      .subscribe((data) => {
        console.log('🚀 ~ data:', data);
        this.priceService.productTaxes = data as Taxes;
      });
  }
}
