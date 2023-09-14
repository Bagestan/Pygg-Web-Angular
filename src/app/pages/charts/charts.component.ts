import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChartsService } from 'src/app/services/charts.service';
import { FormService } from 'src/app/services/utils/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartFilter } from './models/chartModels';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  collapsePanel!: boolean;
  form!: FormGroup;

  chartLimitOptions = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
    { label: 40, value: 40 },
    { label: 50, value: 50 },
    { label: 60, value: 60 },
    { label: 80, value: 80 },
    { label: 100, value: 100 },
    { label: 'Todos', value: 0 },
  ];

  chartTypeOptions = [
    { value: 'bar', label: 'Barras' },
    { value: 'stackedBar', label: 'Barras Combinadas' },
    { value: 'fullStackedBar', label: 'Barras Proporcionais' },
    { value: 'doughnut', label: 'Donut' },
  ];

  chartDataOptions = [
    { value: 'profitByClient', label: 'Lucro e Faturamento por cliente' },
    { value: 'option2', label: 'Opção 2' },
  ];

  chartFieldsOptions = [
    { value: 'PROFITVALUE', label: 'Lucro', checked: true },
    { value: 'BILLINGVALUE', label: 'Valor Faturamento', checked: true },
    {
      value: 'BILLINGQUANTITY',
      label: 'Quantidade Faturamento',
      checked: true,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private formService: FormService,
    private nzMessage: NzMessageService,
    private chartService: ChartsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.collapsePanel = true;

    this.route.params.subscribe((data) => console.log(data));
  }

  buildForm() {
    this.form = this.fb.group({
      endDate: [new Date(), Validators.required],
      startDate: [new Date(), Validators.required],
      chartLimit: [5, Validators.required],
      chartType: ['bar', Validators.required],
      chartDataOptions: ['profitByClient', Validators.required],
      chartFields: [this.chartFieldsOptions, Validators.required],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.form.controls;

      const chartForm: ChartFilter = {
        startDate: this.formatarData(this.form.get('startDate')?.value),
        endDate: this.formatarData(this.form.get('endDate')?.value),
        maxChartItems: this.form.get('chartLimit')?.value,
        chartType: this.form.get('chartType')?.value,
        chartData: this.form.get('chartDataOptions')?.value,
        chartFields: this.chartFieldsOptions
          .filter((option) => option.checked)
          .map((option) => option.value),
      };

      this.chartService.getChartData(chartForm);
      this.openChart(chartForm.chartType);
      this.collapsePanel = false;
    } else {
      this.nzMessage.warning('Verifique as informações do formulário');
      this.formService.validateAllFormFields(this.form);
    }
  }

  openChart(chartType: string) {
    this.router.navigate([`main/charts/${chartType}`]);
  }

  getChartFieldsOption(event: string) {
    switch (event) {
      case 'profitByClient': {
        this.chartFieldsOptions = [
          { value: 'Profit', label: 'Lucro', checked: true },
          { value: 'BillingValue', label: 'Valor Faturamento', checked: true },
          {
            value: 'BillingQuantity',
            label: 'Quantidade Faturamento',
            checked: true,
          },
        ];
        break;
      }
      case 'option2': {
        this.chartFieldsOptions = [
          {
            value: 'option1',
            label: 'option1',
            checked: true,
          },
          {
            value: 'option2',
            label: 'option2',
            checked: true,
          },
        ];
      }
    }

    this.form.patchValue({
      chartFields: this.chartFieldsOptions,
    });
  }

  resetForm(): void {
    this.form.reset();
  }

  formatarData(data: Date): string {
    return this.datePipe.transform(data, 'dd.MM.yyyy') || '';
  }
}
