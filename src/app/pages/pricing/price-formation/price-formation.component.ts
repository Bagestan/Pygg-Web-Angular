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

  productTaxes!: Taxes;
  productCost!: ProductCost;

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

    this.firebird
      .getPaymentOption()
      .pipe(take(1))
      .subscribe((data) => {
        this.paymentOptions = data as PaymentData[];
        this.paymentOptionsLoading = false;
      });

    this.firebird
      .getPriceMarkup()
      .pipe(take(1))
      .subscribe((data) => {
        this.markupOptions = data as MarkupData[];
        this.markupOptionsLoading = false;
      });

    this.firebird
      .getPriceTaxes(this.priceService.customer.id)
      .subscribe((data: any) => {
        this.productTaxes = data[0] as Taxes;
      });
  }

  submit() {
    this.formService.validateAllFormFields(this.priceForm);

    console.log('🚀 ~ this.priceForm.value:', this.priceForm.value);

    if (this.priceForm.valid) {
      this.displayPriceForm = false;

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
    } else {
      this.message.error('Verifique o(s) campo(s) em vermelho');
    }
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
}
