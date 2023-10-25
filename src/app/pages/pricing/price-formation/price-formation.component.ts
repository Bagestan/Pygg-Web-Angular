import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCost, Product } from 'src/app/services/shared/types';
import { PriceFormationService } from '../../../services/price-formation.service';
import { FireBirdService } from '../../../services/firebird.service';
import { Router } from '@angular/router';

interface MarkupData {
  ID_TAB: number;
  CD_DS: string;
  MKP_TOT: number;
}

interface paymentData {
  CD_DS: string;
  ID_PGTO: number;
  JUR_TOT: number;
}

@Component({
  selector: 'app-price-formation',
  templateUrl: './price-formation.component.html',
  styleUrls: ['./price-formation.component.scss'],
})
export class PriceFormationComponent {
  product!: Product;
  form!: FormGroup;

  markupOptions!: MarkupData[];
  paymentOptions!: paymentData[];
  markupInterest!: number;
  paymentInterest!: number;

  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): string => value.replace(' %', '');

  constructor(
    private fb: FormBuilder,
    private priceService: PriceFormationService,
    private firebirdService: FireBirdService,
    private router: Router
  ) {
    this.product = this.priceService.product;

    this.form = this.fb.group({
      markupId: [null, [Validators.required]],
      markupName: [null],
      markupInterest: [null],
      paymentId: [null, [Validators.required]],
      paymentName: [null],
      paymentInterest: [null],
      profit: [null, [Validators.required]],
    });

    if (this.product) {
      this.getMarkup();
      this.getPaymentOption();
    } else {
      this.router.navigate(['main/pricing']);
    }
  }

  getMarkup() {
    this.firebirdService.getMarkup().subscribe((data) => {
      this.markupOptions = data as MarkupData[];
    });
  }

  getPaymentOption() {
    this.firebirdService.getPaymentOption().subscribe((data) => {
      this.paymentOptions = data as paymentData[];
    });
  }

  submit() {
    const productCost: ProductCost = {
      markup: {
        markupId: this.form.get('markupId')?.value,
        markupName: this.form.get('markupName')?.value,
        markupInterest: this.form.get('markupInterest')?.value,
      },
      payment: {
        paymentId: this.form.get('paymentId')?.value,
        paymentName: this.form.get('paymentName')?.value,
        paymentInterest: this.form.get('paymentInterest')?.value,
      },
      profit: this.form.get('profit')?.value,
    };

    this.priceService.productCost = productCost;
    this.router.navigate(['/main/pricing/final']);
  }

  updateMarkupInterest(event: number) {
    this.form.patchValue({
      markupInterest: this.markupOptions[event].MKP_TOT,
      markupName: this.markupOptions[event].CD_DS,
    });

    this.markupInterest = this.markupOptions[event].MKP_TOT;
  }

  updatePaymentInterest(event: number) {
    this.form.patchValue({
      paymentInterest: this.paymentOptions[event].JUR_TOT,
      paymentName: this.paymentOptions[event].CD_DS,
    });
    this.paymentInterest = this.paymentOptions[event].JUR_TOT;
  }
}
