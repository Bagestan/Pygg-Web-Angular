import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { SearchClientComponent } from '../shared/Presentational-Components/search-client/search-client.component';
import { Customer } from 'src/app/services/shared/types';
import { FireBirdService } from '../../services/firebird.service';
import { FormService } from 'src/app/services/utils/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceFormationService } from 'src/app/services/price-formation.service';
import { NzMessageService } from 'ng-zorro-antd/message';

interface IModalData {
  favoriteLibrary: string;
  favoriteFramework: string;
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
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
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      customer: [null, Validators.required],
      customerId: [null, Validators.required],
      customerCNPJ: [null],
      referenceId: [75129, Validators.required],
    });
  }

  createModal() {
    const modal = this.modal.create<SearchClientComponent, IModalData>({
      nzClosable: false,
      nzFooter: null,
      nzContent: SearchClientComponent,
      nzViewContainerRef: this.viewContainerRef,
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
        .getPriceReference(referenceId)
        .pipe()
        .subscribe((data: any) => {
          if (data.length == 0) {
            this.message.remove();
            this.message.error('Referência não encontrada');
          } else {
            this.message.remove();
            this.message.success('');

            const colors = this.getColors(data);
            const cost = this.getMean(data, 'CUSTO');

            this.priceService.product = {
              img: data[0].IMAGEM,
              collectionId: data[0].CD_CO,
              collectionName: data[0].DS_COL,
              referenceName: data[0].DS_REF,
              colors: colors,
              cost: cost,
              referenceId: referenceId,
            };
          }
        });
    } else {
    }
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

  teste() {
    console.log('teste');
  }

  openProduct() {
    this.router.navigate([`formation`], { relativeTo: this.route });
  }

  routeReturn() {
    this.priceService.resetProduct();
    this.router.navigate(['main/pricing']);
  }
}
