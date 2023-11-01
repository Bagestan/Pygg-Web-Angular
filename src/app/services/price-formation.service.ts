import { Injectable } from '@angular/core';
import {
  Customer,
  MarkupData,
  Product,
  ProductCost,
  Taxes,
  PaymentData,
} from './shared/types';
import { FireBirdService } from './firebird.service';

@Injectable({
  providedIn: 'root',
})
export class PriceFormationService {
  product!: Product;
  customer!: Customer;
  productTaxes!: Taxes;
  productCost!: ProductCost;

  markupOptions!: MarkupData[];
  paymentOptions!: PaymentData[];
  markupInterest!: number;
  paymentInterest!: number;

  despesasPrecoCalc!: number;
  receitaBrutaPrecoCalc!: number;
  receitaLiquidaPrecoCalc!: number;

  despesasPrecoInput!: number;
  receitaBrutaPrecoInput!: number;
  receitaLiquidaPrecoInput!: number;

  divisor!: number;

  lucroBruto!: number;
  lucroInput!: number;
  precoCalc!: number;
  lucroCalculado!: number;

  constructor(private firebirdService: FireBirdService) {}

  saveProductCost(productCost: ProductCost) {
    this.productCost = productCost;
    this.lucroInput = this.productCost.profit;
    this.calcLucroBruto();
    this.calcDivisor();
    this.calcPrice();
    this.calcDespesasPrecoCalc();
  }

  getMarkup() {
    this.firebirdService.getPriceMarkup().subscribe((data) => {
      this.markupOptions = data as MarkupData[];
    });
  }

  getPaymentOption() {
    this.firebirdService.getPaymentOption().subscribe((data) => {
      this.paymentOptions = data as PaymentData[];
    });
  }

  getTaxes() {
    this.firebirdService
      .getPriceTaxes(this.customer.id)
      .subscribe((data: any) => {
        this.productTaxes = data[0] as Taxes;
      });
  }

  calcLucroBruto() {
    this.lucroBruto =
      this.lucroInput /
      ((100 - (this.productTaxes.IR + this.productTaxes.CSLL)) / 100);
  }

  calcDivisor() {
    this.divisor =
      (100 - (this.markupInterest + this.paymentInterest + this.lucroBruto)) /
      100;
  }

  calcPrice() {
    this.precoCalc = this.product.cost / this.divisor;
  }

  calcDespesasPrecoCalc() {
    this.despesasPrecoCalc =
      this.precoCalc * ((this.markupInterest + this.paymentInterest) / 100);

    this.receitaBrutaPrecoCalc =
      this.precoCalc - this.product.cost - this.despesasPrecoCalc;

    this.receitaLiquidaPrecoCalc =
      this.receitaBrutaPrecoCalc -
      this.receitaBrutaPrecoCalc * (this.productTaxes.IR / 100) -
      this.receitaBrutaPrecoCalc * (this.productTaxes.CSLL / 100);

    this.calcDespesasPrecoInput(this.precoCalc);
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
      img: null,
      collectionId: 0,
      collectionName: '',
      colors: '',
      referenceName: '',
      referenceId: 0,
      cost: 0,
    };
    this.customer = { name: '', id: 0, CNPJ: '' };
    this.productTaxes = { IR: 0, CSLL: 0 };
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
    this.despesasPrecoCalc = 0;
    this.receitaBrutaPrecoCalc = 0;
    this.receitaLiquidaPrecoCalc = 0;
    this.despesasPrecoInput = 0;
    this.receitaBrutaPrecoInput = 0;
    this.receitaLiquidaPrecoInput = 0;
    this.divisor = 0;
    this.lucroBruto = 0;
    this.lucroInput = 0;
    this.precoCalc = 0;
    this.lucroCalculado = 0;
  }
}
