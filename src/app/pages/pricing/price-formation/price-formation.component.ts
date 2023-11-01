import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCost } from 'src/app/services/shared/types';
import { PriceFormationService } from '../../../services/price-formation.service';
import { Router } from '@angular/router';
import { FormService } from '../../../services/utils/form.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-price-formation',
  templateUrl: './price-formation.component.html',
  styleUrls: ['./price-formation.component.scss'],
})
export class PriceFormationComponent implements OnInit {
  form!: FormGroup;

  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): string => value.replace(' %', '');

  constructor(
    private fb: FormBuilder,
    public priceService: PriceFormationService,
    private router: Router,
    private formService: FormService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      markupId: [null, [Validators.required]],
      markupName: [null],
      markupInterest: [null],
      markupMargin: [null],
      paymentId: [null, [Validators.required]],
      paymentName: [null],
      paymentInterest: [null],
      profit: [null, [Validators.required]],
    });

    if (this.priceService.product) {
      this.priceService.getMarkup();
      this.priceService.getPaymentOption();
    } else {
      this.router.navigate(['main/pricing']);
    }
  }

  submit() {
    this.formService.validateAllFormFields(this.form);

    if (this.form.valid) {
      const productCost: ProductCost = {
        markup: {
          markupId: this.form.get('markupId')?.value,
          markupName: this.form.get('markupName')?.value,
          markupInterest: this.form.get('markupInterest')?.value,
          markupMargin: this.form.get('markupMargin')?.value,
        },
        payment: {
          paymentId: this.form.get('paymentId')?.value,
          paymentName: this.form.get('paymentName')?.value,
          paymentInterest: this.form.get('paymentInterest')?.value,
        },
        profit: this.form.get('profit')?.value,
      };

      this.priceService.saveProductCost(productCost);
      this.router.navigate(['/main/pricing/final']);
    } else {
      this.message.error('Verifique o(s) campo(s) em vermelho');
    }
  }

  updateMarkupInterest(event: number) {
    this.form.patchValue({
      markupInterest: this.priceService.markupOptions[event].MKP_TOT,
      markupName: this.priceService.markupOptions[event].CD_DS,
      markupMargin: this.priceService.markupOptions[event].MC_TOT,
    });

    this.priceService.markupInterest =
      this.priceService.markupOptions[event].MKP_TOT;
  }

  updatePaymentInterest(event: number) {
    this.form.patchValue({
      paymentInterest: this.priceService.paymentOptions[event].JUR_TOT,
      paymentName: this.priceService.paymentOptions[event].CD_DS,
    });
    this.priceService.paymentInterest =
      this.priceService.paymentOptions[event].JUR_TOT;
  }

  routeReturn() {
    this.priceService.resetProduct();
    this.router.navigate(['main/pricing']);
  }
}
