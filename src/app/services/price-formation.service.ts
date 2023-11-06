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

  lucroInput!: number;
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
    return (
      this.lucroInput /
      ((100 - (this.productTaxes.IR + this.productTaxes.CSLL)) / 100)
    );
  }

  calcDivisor() {
    return (
      (100 -
        (this.markupInterest + this.paymentInterest + this.calcLucroBruto())) /
      100
    );
  }

  calcPrice(): number {
    if (this.product.cost && this.calcDivisor()) {
      return this.product.cost / this.calcDivisor();
    }
    return -0;
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
