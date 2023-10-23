import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { FireBirdService } from 'src/app/services/firebird.service';
import { customer } from 'src/app/services/shared/types';

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
    private fireBirdService: FireBirdService
  ) {
    this.form = this.fb.group({
      customerSearch: [null, Validators.required],
    });
  }

  submit() {
    this.searchClient();
  }

  searchClient() {
    const { customerSearch } = this.form.getRawValue();
    this.fireBirdService
      .customerSearch(customerSearch)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.searchResult(data);
      });
  }

  searchResult(data: []) {
    data.map((item: any) => {
      item.name = item['NM_CLI'];
      item.id = item['CD_CLI'];
      delete item['NM_CLI'];
      delete item['CD_CLI'];
    });
    this.clientListLength = data.length;
    this.clientList = data.slice(0, 5);
  }

  selectCustomer(item: customer) {
    this.#modal.destroy(item);
  }
}
