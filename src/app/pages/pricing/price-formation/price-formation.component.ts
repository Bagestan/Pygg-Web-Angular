import { Component } from '@angular/core';
import { product } from 'src/app/services/shared/types';

@Component({
  selector: 'app-price-formation',
  templateUrl: './price-formation.component.html',
  styleUrls: ['./price-formation.component.scss'],
})
export class PriceFormationComponent {
  product!: product;

  constructor() {
    const restore = localStorage.getItem('product');

    if (restore) {
      this.product = JSON.parse(restore);
    }
  }
}
