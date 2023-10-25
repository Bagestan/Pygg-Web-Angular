import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { SearchClientComponent } from '../shared/Presentational-Components/search-client/search-client.component';
import { Customer, Product } from 'src/app/services/shared/types';
import { FireBirdService } from '../../services/firebird.service';
import { FormService } from 'src/app/services/utils/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceFormationService } from 'src/app/services/price-formation.service';

interface IModalData {
  favoriteLibrary: string;
  favoriteFramework: string;
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {
  protected destroy$: Subject<void> = new Subject<void>();

  form!: FormGroup;

  productInfoLoading = true;
  costInfoLoading = true;
  showSearchCustomer = true;
  product!: Product;

  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    private viewContainerRef: ViewContainerRef,
    private fireBird: FireBirdService,
    private formService: FormService,
    private router: Router,
    private route: ActivatedRoute,
    private priceService: PriceFormationService
  ) {
    this.buildForm();
  }

  createModal() {
    const modal = this.modal.create<SearchClientComponent, IModalData>({
      nzClosable: false,
      nzContent: SearchClientComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => {
        new Promise((resolve) => setTimeout(resolve, 1000));
      },
    });
    modal.afterClose.subscribe((data) => {
      this.selectedCustomer(data);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      customer: ['DELZUITA DOS SANTOS GARCIA ME', Validators.required],
      customerId: [1, Validators.required],
      customerCNPJ: ['44.086.932/0001-74'],
      referenceId: [75129, Validators.required],
    });
  }

  selectedCustomer(customer: Customer) {
    this.showSearchCustomer = false;
    this.priceService.customer = customer;
    this.form.patchValue({
      customer: customer.name,
      customerId: customer.id,
      customerCNPJ: customer.CNPJ,
    });
  }

  getProduct() {
    this.formService.validateAllFormFields(this.form);

    if (this.form.valid) {
      const { referenceId } = this.form.getRawValue();
      this.fireBird.getReference(referenceId).subscribe((data: any) => {
        const colors = this.getColors(data);
        const price = this.getMean(data, 'CUSTO');
        this.product = {
          img: data[0]['IMAGEM'],
          collectionId: data[0]['CD_COL'],
          collectionName: data[0]['DS_COL'],
          referenceName: data[0]['DS_REF'],
          colors: colors,
          price: price,
          referenceId: referenceId,
        };
      });
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

  openProduct(product: Product) {
    this.priceService.product = product;
    this.router.navigate([`formation`], { relativeTo: this.route });
  }
}
