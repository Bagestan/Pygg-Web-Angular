import {
  Component,
  ViewContainerRef,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { SearchClientComponent } from '../shared/Presentational-Components/search-client/search-client.component';
import { Customer } from 'src/app/services/shared/types';
import { FireBirdService } from '../../services/firebird.service';
import { FormService } from 'src/app/services/utils/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceFormationService } from 'src/app/services/price-formation.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent implements OnInit {
  protected destroy$: Subject<void> = new Subject<void>();

  form!: FormGroup;

  productInfoLoading = true;
  costInfoLoading = true;
  showSearchCustomer = true;

  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    private viewContainerRef: ViewContainerRef,
    private fireBird: FireBirdService,
    private formService: FormService,
    private router: Router,
    private route: ActivatedRoute,
    protected priceService: PriceFormationService,
    private message: NzMessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      customer: [null, Validators.required],
      customerId: [null, Validators.required],
      customerCNPJ: [null],
      referenceId: ['B1684', Validators.required],
    });

    this.createModal();
  }

  createModal() {
    const modal = this.modal.create<SearchClientComponent>({
      nzClosable: false,
      nzFooter: null,
      nzContent: SearchClientComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzCentered: true,
      nzOnOk: () => {
        new Promise((resolve) => setTimeout(resolve, 1000));
      },
    });
    modal.afterClose.subscribe((customer) => {
      this.selectedCustomer(customer);
    });
  }

  selectedCustomer(customer: Customer) {
    if (customer) {
      this.showSearchCustomer = false;
      this.priceService.customer = customer;

      this.form.patchValue({
        customer: customer.name,
        customerId: customer.id,
        customerCNPJ: customer.CNPJ,
      });

      this.priceService.getTaxes();
    } else {
      this.message.warning('Cliente não selecionado');
    }
  }

  getProduct() {
    this.formService.validateAllFormFields(this.form);

    if (this.form.valid) {
      const { referenceId } = this.form.getRawValue();

      this.fireBird
        .getReferencePrice(referenceId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          if (data.length == 0) {
            this.message.remove();
            this.message.error('Referência não encontrada');
          } else {
            this.message.remove();
            this.message.success('');

            this.priceService.product = {
              img: this.getReferenceImg(referenceId),
              collectionId: data[0].CD_COL,
              collectionName: data[0].DS_COL,
              referenceName: data[0].DS_REF,
              colors: this.getColors(data),
              cost: this.getMean(data, 'CUSTO'),
              referenceId: referenceId,
            };
          }
        });
    } else {
      this.message.remove();
      this.message.error('Verifique os campos');
    }
  }

  getReferenceImg(ref: string) {
    this.fireBird
      .getReferenceImg(ref, this.priceService.customer.id)
      .subscribe((blob) => {
        const url = URL.createObjectURL(blob);
        this.priceService.imgSrc = this.sanitizer.bypassSecurityTrustUrl(url);
      });
  }

  getColors(objects: []) {
    const colorsArray = objects.map((object) => object['DS_COR']);
    const colors = colorsArray.join(', ');

    return colors;
  }

  getMean(objects: [], property: string) {
    const prices = objects.map((object) => object[property]);

    if (prices.length === 0) return 0;

    const soma = prices.reduce((total, numero) => {
      return total + numero;
    }, 0);

    return soma / prices.length;
  }

  openProduct() {
    this.router.navigate([`formation`], { relativeTo: this.route });
  }

  routeReturn() {
    this.priceService.resetProduct();
    this.router.navigate(['main/pricing']);
  }
}
