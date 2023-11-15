import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { Customer } from 'src/app/services/shared/types';
import { FormService } from 'src/app/services/utils/form.service';
import { PriceFormationService } from '../../../../services/price-formation.service';

interface IModalData {
  favoriteLibrary: string;
  favoriteFramework: string;
}

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.scss'],
})
export class SearchClientComponent {
  protected destroy$: Subject<void> = new Subject<void>();

  form!: FormGroup;

  clientList = [];
  clientListLength!: number;

  readonly #modal = inject(NzModalRef);
  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);

  constructor(
    private fb: FormBuilder,
    private priceService: PriceFormationService,
    private message: NzMessageService,
    private formService: FormService
  ) {
    this.form = this.fb.group({
      customerSearch: [null, Validators.required],
    });
  }

  submit() {
    this.formService.validateAllFormFields(this.form);

    const { customerSearch } = this.form.getRawValue();
    this.priceService
      .customerSearch(customerSearch)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.message.remove();
          this.message.success('');
          this.searchResult(data);
        } else {
          this.message.remove();
          this.message.warning('Nenhum registro encontrado');
        }
      });
  }

  searchResult(data: []) {
    data.map((item: any) => {
      item.name = item['NM_CLI'];
      item.id = item['ID_CLI'];
      item.cnpj = item['CD_CLI'];
      delete item['NM_CLI'];
      delete item['ID_CLI'];
      delete item['CD_CLI'];
    });
    this.clientListLength = data.length;
    this.clientList = data.slice(0, 5);
  }

  selectCustomer(item: Customer) {
    this.#modal.destroy(item);
  }
}
