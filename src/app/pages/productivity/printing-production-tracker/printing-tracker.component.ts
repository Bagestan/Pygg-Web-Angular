import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, retry, takeUntil } from 'rxjs';
import { FireBirdService } from 'src/app/services/firebird.service';

interface chartObject {
  argumentField: string;
  valueField: number;
  label: string;
}

@Component({
  selector: 'app-printing-production-tracker',
  templateUrl: './printing-tracker.component.html',
  styleUrls: ['./printing-tracker.component.scss'],
})
export class PrintingTrackerComponent implements OnInit {
  protected destroy$: Subject<void> = new Subject<void>();

  isLoading = false;
  isCollapsed = true;

  form: FormGroup;
  companyOptions: any;
  companies: any = [];
  firstCompany = '';

  productivityChartTitle = 'Produtividade';
  eficienceChartTitle = 'Eficiência';

  MachineBarsChartColor = '#ed94a1';
  PeriodBarsChartColor = '#8cc9da';

  eficienceByMachinesDataSource!: chartObject[];
  productivityByMachinesDataSource!: chartObject[];

  eficienceByPeriodDataSource!: chartObject[];
  productivityByPeriodDataSource!: chartObject[];

  constructor(
    private fb: FormBuilder,
    private firebirdService: FireBirdService
  ) {
    this.getCompanys();

    this.form = this.fb.group({
      startDate: [new Date('09/01/2023'), Validators.required],
      endDate: [new Date('09/30/2023'), Validators.required],
      SelectedCompany: [2, Validators.required],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    const { SelectedCompany, startDate, endDate } = this.form.getRawValue();

    this.getProductivityData(
      SelectedCompany,
      startDate,
      endDate,
      'productionByMachines'
    ).subscribe((data: any) => {
      this.getMachinesDataSources(data);
    });

    this.getProductivityData(
      SelectedCompany,
      startDate,
      endDate,
      'productionByPeriod'
    ).subscribe((data: any) => {
      this.getPeriodDataSources(data);
    });
  }
  getPeriodDataSources(data: any) {
    this.eficienceByPeriodDataSource = [];
    this.productivityByPeriodDataSource = [];

    data.forEach((object: any) => {
      this.eficienceByPeriodDataSource.push({
        argumentField: object.DS_TUR,
        valueField: object.PERCEFIC,
        label: 'Eficience',
      });

      this.productivityByPeriodDataSource.push({
        argumentField: object.DS_TUR,
        valueField: object.PERCPROD,
        label: 'Productivity',
      });
    });
  }

  getMachinesDataSources(data: any) {
    this.eficienceByMachinesDataSource = [];
    this.productivityByMachinesDataSource = [];

    data.forEach((object: any) => {
      this.eficienceByMachinesDataSource.push({
        argumentField: object.CD_MAQ,
        valueField: object.PERCEFIC,
        label: 'Eficience',
      });

      this.productivityByMachinesDataSource.push({
        argumentField: object.CD_MAQ,
        valueField: object.PERCPROD,
        label: 'Productivity',
      });
    });
  }

  getProductivityData(
    company: string,
    startDate: Date,
    endDate: Date,
    data: string
  ) {
    return this.firebirdService.getPrintingProductionData(
      company,
      startDate,
      endDate,
      data
    );
  }

  getCompanys() {
    this.firebirdService
      .selectFromTable('SYS_EMP', undefined, undefined, 'CD_EMP, DS_EMP')
      .pipe(takeUntil(this.destroy$))
      .pipe(retry(3))
      .subscribe((data: any) => {
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
}
