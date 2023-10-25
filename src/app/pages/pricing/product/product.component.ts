import { Component, Input } from '@angular/core';
import { Product, Taxes } from 'src/app/services/shared/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() productInfoLoading = true;
  @Input() showOption = true;

  @Input() product!: Product;

  @Input() productTaxes!: Taxes;
}
