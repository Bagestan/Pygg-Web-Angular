import { Component, Input } from '@angular/core';
import { product } from 'src/app/services/shared/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() productInfoLoading = true;
  @Input() showOption = true;

  @Input() product: product = {
    img: null,
    collectionId: 83541,
    collectionName: 'Verao',
    referenceId: 83541,
    referenceName: 'Nome Do Produto',
    colors: 'Vermelho, Azul, Verde',
    price: 18.56,
  };
}
