import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PriceFormationService } from 'src/app/services/price-formation.service';
import {
  Customer,
  Product,
  ProductCost,
  Taxes,
} from 'src/app/services/shared/types';
import { FormService } from 'src/app/services/utils/form.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  protected destroy$: Subject<void> = new Subject<void>();

  @Input() path!: string;

  @Input() productInfoLoading = true;
  @Input() showOption = true;

  @Input() product!: Product;
  @Input() productImg!: any;
  @Input() customer!: Customer;
  @Input() productCost!: ProductCost;
  @Input() price!: number;
  @Input() lucroCalculado!: number;
  @Input() productTaxes!: Taxes;
  @Input() result!: string;
  @Input() receitaLiquidaPrecoInput!: number;

  @Output() outputPrice = new EventEmitter<number>();

  form!: FormGroup;
  margin!: number;

  isVisible = false;

  constructor(
    private fb: FormBuilder,
    public priceService: PriceFormationService,
    private formService: FormService
  ) {}

  imgModal(value: boolean) {
    this.isVisible = value;
  }

  ngOnInit() {
    this.form = this.fb.group({
      newPrice: ['', [Validators.required]],
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.formService.validateAllFormFields(this.form);

      if (this.form.valid && this.form) {
        const value: number = this.form
          .get('newPrice')
          ?.value.toString()
          .replace(',', '.');

        this.outputPrice.emit(value);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['price'] && changes['price'].currentValue) {
      const value = changes['price'].currentValue;

      const formatValue = value.toLocaleString('pt-BR', {
        style: 'decimal',
        maximumFractionDigits: 2,
      });

      Promise.resolve().then(() => {
        this.form.get('newPrice')?.setValue(formatValue);
      });
    }
  }
}
