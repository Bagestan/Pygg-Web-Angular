import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { SearchClientComponent } from '../shared/Presentational-Components/search-client/search-client.component';
import { customer, product } from 'src/app/services/shared/types';
import { FireBirdService } from '../../services/firebird.service';
import { FormService } from 'src/app/services/utils/form.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  product!: product;

  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    private viewContainerRef: ViewContainerRef,
    private fireBird: FireBirdService,
    private formService: FormService,
    private router: Router,
    private route: ActivatedRoute
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
    modal.afterOpen.subscribe(() => {});
    modal.afterClose.subscribe((data) => {
      this.selectedCustomer(data);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      customer: [null, Validators.required],
      customerId: [null, Validators.required],
      reference: [27627, Validators.required],
    });
  }

  selectedCustomer(customer: customer) {
    this.showSearchCustomer = false;
    this.form.patchValue({ customer: customer.name, customerId: customer.id });
  }

  getProduct() {
    this.formService.validateAllFormFields(this.form);

    if (this.form.valid) {
      const { reference } = this.form.getRawValue();
      this.fireBird.getReference(reference).subscribe((data: any) => {
        const coresJuntas = this.getColors(data);
        this.product = {
          img: data[0]['IMAGEM'],
          collectionId: data[0]['CD_COL'],
          collectionName: data[0]['DS_COL'],
          colors: coresJuntas,
          referenceName: data[0]['DS_REF'],
          price: 12.34,
          referenceId: this.form.get('reference')?.value,
        };
      });
    }
  }

  getColors(objects: []) {
    const cores = objects.map((object) => object['DS_COR']);
    const coresJuntas = cores.join(', ');
    return coresJuntas;
  }

  openProduct(product: product) {
    const productJSON = JSON.stringify(product);
    localStorage.setItem('product', productJSON);

    this.router.navigate([`formation`], { relativeTo: this.route });
  }
}
