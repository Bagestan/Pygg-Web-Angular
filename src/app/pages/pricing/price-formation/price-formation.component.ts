import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MarkupData,
  PaymentData,
  ProductCost,
  Taxes,
} from 'src/app/services/shared/types';
import { PriceFormationService } from '../../../services/price-formation.service';
import { Router } from '@angular/router';
import { FormService } from '../../../services/utils/form.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FirebirdService } from '../../../services/firebird.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-price-formation',
  templateUrl: './price-formation.component.html',
  styleUrls: ['./price-formation.component.scss'],
})
export class PriceFormationComponent implements OnInit {
  priceForm!: FormGroup;
  displayPriceForm = true;

  markupOptions!: MarkupData[];
  markupOptionsLoading = true;
  markupInterest!: number;

  paymentOptions!: PaymentData[];
  paymentOptionsLoading = true;
  paymentInterest!: number;

  product = this.priceService.product;
  productImg = this.priceService.productImg;

  productCost!: ProductCost;
  productTaxes!: Taxes;

  despesasPrecoCalc!: number;
  receitaBrutaPrecoCalc!: number;
  receitaLiquidaPrecoCalc!: number;

  despesasPrecoInput!: number;
  receitaBrutaPrecoInput!: number;
  receitaLiquidaPrecoInput!: number;

  lucroInput!: number;
  lucroCalculado!: number;

  price!: number;
  result = this.receitaLiquidaPrecoInput > 0 ? 'approved' : 'denied';

  constructor(
    private fb: FormBuilder,
    public priceService: PriceFormationService,
    private router: Router,
    private formService: FormService,
    private message: NzMessageService,
    private firebird: FirebirdService
  ) {}

  ngOnInit() {
    this.priceForm = this.fb.group({
      markupId: [null, [Validators.required]],
      markupName: [null],
      markupInterest: [null],
      markupMargin: [null],
      paymentId: [null, [Validators.required]],
      paymentName: [null],
      paymentInterest: [null],
      profit: [null, [Validators.required]],
    });

    if (this.product && this.product.cost) {
      this.priceService
        .getPaymentOption()
        .pipe(take(1))
        .subscribe((data) => {
          this.paymentOptions = data as PaymentData[];
          this.paymentOptionsLoading = false;
        });

      this.priceService
        .getPriceMarkup()
        .pipe(take(1))
        .subscribe((data) => {
          this.markupOptions = data as MarkupData[];
          this.markupOptionsLoading = false;
        });
    } else {
      this.router.navigate(['main/pricing']);
    }
  }

  submit() {
    this.formService.validateAllFormFields(this.priceForm);

    if (this.priceForm.valid) {
      this.priceService
        .getPriceTaxes(this.priceService.customer.id)
        .subscribe((data: any) => {
          this.productTaxes = data[0] as Taxes;
          this.price = this.calcPrice();
          this.calcLucroBruto();
          this.calcDivisor();
          this.calcDespesasPrecoCalc();
        });

      this.productCost = {
        markup: {
          markupId: this.priceForm.get('markupId')?.value,
          markupName: this.priceForm.get('markupName')?.value,
          markupInterest: this.priceForm.get('markupInterest')?.value,
          markupMargin: this.priceForm.get('markupMargin')?.value,
        },
        payment: {
          paymentId: this.priceForm.get('paymentId')?.value,
          paymentName: this.priceForm.get('paymentName')?.value,
          paymentInterest: this.priceForm.get('paymentInterest')?.value,
        },
        profit: this.priceForm.get('profit')?.value,
      };
      this.lucroInput = this.productCost.profit;
    } else {
      this.message.error('Verifique o(s) campo(s) em vermelho');
    }
  }

  calcLucroBruto() {
    return (
      this.lucroInput /
      ((100 - (this.productTaxes.IR + this.productTaxes.CSLL)) / 100)
    );
  }

  calcDivisor(): number {
    return (
      (100 -
        (this.markupInterest + this.paymentInterest + this.calcLucroBruto())) /
      100
    );
  }

  calcPrice(): number {
    return this.product.cost / this.calcDivisor();
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

  updateMarkupInterest(event: number) {
    this.priceForm.patchValue({
      markupInterest: this.markupOptions[event].MKP_TOT,
      markupName: this.markupOptions[event].CD_DS,
      markupMargin: this.markupOptions[event].MC_TOT,
    });
    this.markupInterest = this.markupOptions[event].MKP_TOT;
  }
  updatePaymentInterest(event: number) {
    this.priceForm.patchValue({
      paymentInterest: this.paymentOptions[event].JUR_TOT,
      paymentName: this.paymentOptions[event].CD_DS,
    });
    this.paymentInterest = this.paymentOptions[event].JUR_TOT;
  }

  routeReturn() {
    this.router.navigate(['main/pricing']);
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
    this.priceService.customer = { name: '', id: 0, CNPJ: '' };
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
