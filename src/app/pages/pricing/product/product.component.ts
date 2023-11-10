import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FirebirdService } from 'src/app/services/firebird.service';
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
  @Input() productTaxes!: Taxes;
  @Input() productCost!: ProductCost;

  markupInterest!: number;
  paymentInterest!: number;

  despesasPrecoCalc!: number;
  receitaBrutaPrecoCalc!: number;
  receitaLiquidaPrecoCalc!: number;

  despesasPrecoInput!: number;
  receitaBrutaPrecoInput!: number;
  receitaLiquidaPrecoInput!: number;

  lucroInput!: number;
  lucroCalculado!: number;

  form!: FormGroup;
  margin!: number;

  isVisible = false;

  price = new FormControl(null, { updateOn: 'blur' });

  result = this.receitaLiquidaPrecoInput > 0 ? 'approved' : 'denied';

  constructor(
    private fb: FormBuilder,
    public priceService: PriceFormationService,
    private formService: FormService,
    private firebird: FirebirdService
  ) {}

  imgModal(value: boolean) {
    this.isVisible = value;
  }

  ngOnInit() {
    this.form = this.fb.group({
      price: [
        this.calcPrice().toFixed(2).replace('.', ','),
        [Validators.required],
      ],
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.formService.validateAllFormFields(this.form);

      if (this.form.valid) {
        const { price } = this.form.getRawValue();
        this.calcDespesasPrecoInput(price);
      }
    });
  }

  calcLucroBruto(): number {
    if (this.productTaxes) {
      return (
        this.lucroInput /
        ((100 - (this.productTaxes.IR + this.productTaxes.CSLL)) / 100)
      );
    } else {
      return 0;
    }
  }

  calcDivisor(): number {
    return (
      (100 -
        (this.markupInterest + this.paymentInterest + this.calcLucroBruto())) /
      100
    );
  }

  calcPrice(): number {
    if (this.product && this.calcDivisor()) {
      return this.product.cost / this.calcDivisor();
    }
    return 0;
  }

  calcDespesasPrecoCalc() {
    this.despesasPrecoCalc =
      this.calcPrice() * ((this.markupInterest + this.paymentInterest) / 100);

    this.receitaBrutaPrecoCalc =
      this.calcPrice() - this.product.cost - this.despesasPrecoCalc;

    this.receitaLiquidaPrecoCalc =
      this.receitaBrutaPrecoCalc -
      this.receitaBrutaPrecoCalc * (this.productTaxes.IR / 100) -
      this.receitaBrutaPrecoCalc * (this.productTaxes.CSLL / 100);

    this.calcDespesasPrecoInput(this.calcPrice());
  }

  calcDespesasPrecoInput(preco: number) {
    this.despesasPrecoInput =
      preco * ((this.markupInterest + this.paymentInterest) / 100);

    this.receitaBrutaPrecoInput =
      preco - this.product.cost - this.despesasPrecoInput;

    this.receitaLiquidaPrecoInput =
      this.receitaBrutaPrecoInput -
      this.receitaBrutaPrecoInput * (this.productTaxes.IR / 100) -
      this.receitaBrutaPrecoInput * (this.productTaxes.CSLL / 100);

    this.lucroCalculado = (this.receitaLiquidaPrecoInput / preco) * 100;
  }

  resetProduct() {
    this.product = {
      collectionId: 0,
      collectionName: '',
      colors: '',
      referenceName: '',
      referenceId: 0,
      cost: 0,
    };
    this.customer = { name: '', id: 0, CNPJ: '' };
    this.productTaxes = { IR: 0, CSLL: 0 };
  }

  resetFinalProduct() {
    this.productCost = {
      markup: {
        markupId: 0,
        markupName: '',
        markupInterest: 0,
        markupMargin: 0,
      },
      payment: {
        paymentId: 0,
        paymentName: '',
        paymentInterest: 0,
      },
      profit: 0,
    };
    this.markupInterest = 0;
    this.paymentInterest = 0;
    this.lucroInput = 0;
  }
}
