import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireBirdService } from 'src/app/services/firebird.service';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { FormService } from 'src/app/services/utils/form.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, retry, takeUntil } from 'rxjs';
import { QualityService } from 'src/app/services/quality.service';

@Component({
  selector: 'app-search-quality',
  templateUrl: './search-quality.component.html',
  styleUrls: ['./search-quality.component.scss'],
})
export class SearchQualityComponent implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();

  companies: any = [];
  companyName!: string;
  firstCompany = '';
  companyOptions: any;

  isModalVisible = false;

  isLoading = false;
  try = 0;
  form!: FormGroup;

  checked = false;

  size: NzButtonSize = 'default';

  constructor(
    private firebirdService: FireBirdService,
    private fb: FormBuilder,
    private qualityService: QualityService,
    private router: Router,
    private formService: FormService,
    private nzMessage: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getCompanys();

    this.form = this.fb.group({
      SelectedCompany: [1, Validators.required],
      endDate: [new Date(), Validators.required],
      startDate: [new Date(), Validators.required],
      hideResolved: [false],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.qualityService.searchFormData = this.form.value;
      this.router.navigate(['main/quality/table']);
    } else {
      this.formService.validateAllFormFields(this.form);
      this.nzMessage.error(`Revise as informações do Formulário`, {
        nzDuration: 4000,
      }).onClose!;
    }
  }

  getCompanys() {
    this.firebirdService
      .selectFromTable('SYS_EMP', undefined, undefined, 'CD_EMP, DS_EMP')
      .pipe(takeUntil(this.destroy$))
      .pipe(retry(3))
      .subscribe((data: any) => {
        console.log('🚀 ~ data:', data);
        this.isLoading = true;
        this.companies = data;
        if (data.length > 0) {
          for (let i = 0; i < this.companies.length; i++) {
            const Options = this.companies[i];
            this.companies[i].OptionName = `
              ${Options.CD_EMP} - ${Options.DS_EMP}`;
          }
          this.companyOptions = this.companies.map((company: any) => {
            return {
              CD_EMP: company.CD_EMP,
              OptionName: company.OptionName,
            };
          });
          this.firstCompany = this.companyOptions[0].CD_EMP;
        }
        this.isLoading = false;
      });
  }

  modalVisibility(value: boolean) {
    this.isModalVisible = value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
