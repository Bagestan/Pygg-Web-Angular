import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChartsService } from 'src/app/services/charts.service';
import { FormService } from 'src/app/services/utils/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartFilter, FieldsOptions } from './utils/chartModels';
import { DateFormatService } from 'src/app/services/utils/date-format.service';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';

const chartDataOptions = [
  {
    value: 'result',
    label: 'Resultado',
    children: [
      {
        value: 'resultByClient',
        label: 'Cliente',
        isLeaf: true,
      },
      {
        value: 'resultBySector',
        label: 'Ramo de Atividade',
        isLeaf: true,
      },
      {
        value: 'resultByState',
        label: 'Estado',
        isLeaf: true,
      },
      {
        value: 'resultByTreatment',
        label: 'Beneficiamento',
        isLeaf: true,
      },
    ],
  },
  {
    value: 'option',
    label: 'option',
    children: [
      {
        value: 'option',
        label: 'option',
        isLeaf: true,
      },
      {
        value: 'option',
        label: 'option',
        isLeaf: true,
      },
      {
        value: 'option',
        label: 'option',
        isLeaf: true,
      },
    ],
  },
];

@Component({
  selector: 'app-lucratividade',
  templateUrl: './lucratividae.component.html',
  styleUrls: ['./lucratividae.component.scss'],
})
export class LucratividadeComponent implements OnInit {
  collapsePanel!: boolean;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dateService: DateFormatService,
    private formService: FormService,
    private nzMessage: NzMessageService,
    private chartService: ChartsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.collapsePanel = true;
  }

  buildForm() {
    this.form = this.fb.group({
      endDate: [new Date('2023-10-02'), Validators.required],
      startDate: [new Date('2022-10-02'), Validators.required],
      chartLimit: [5, Validators.required],
      chartType: ['bar', Validators.required],
      chartDataOptions: [['result', 'resultByClient'], Validators.required],
      chartFields: ['ProfitValue', Validators.required],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.form.controls;

      const chartForm: ChartFilter = {
        startDate: this.dateService.formatDateBR(
          this.form.get('startDate')?.value
        ),
        endDate: this.dateService.formatDateBR(this.form.get('endDate')?.value),
        maxChartItems: this.form.get('chartLimit')?.value,
        chartType: this.form.get('chartType')?.value,
        chartData: this.form.get('chartDataOptions')?.value[1],
        chartFields: this.form.get('chartFields')?.value,
      };

      this.chartService.getChartData(chartForm);
      this.router.navigate([chartForm.chartType], { relativeTo: this.route });
      this.collapsePanel = false;
    } else {
      this.nzMessage.warning('Verifique as informações do formulário');
      this.formService.validateAllFormFields(this.form);
    }
  }

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
    { value: 'doughnut', label: 'Donut' },
  ];

  nzOptions: NzCascaderOption[] = chartDataOptions;

  resultByClientFieldsOptions: FieldsOptions[] = [
    { value: 'ProfitValue', label: 'Valor de Lucro' },
    { value: 'ProfitPercentage', label: 'Porcentagem de Lucro' },
    { value: 'BillingValue', label: 'Valor Faturamento' },
    { value: 'BillingQuantity', label: 'Quantidade Faturamento' },
  ];

  genericFieldsOptions: FieldsOptions[] = [
    { value: 'option', label: 'option' },
    { value: 'option2', label: 'option2' },
  ];

  chartFieldsOptions: FieldsOptions[] = this.resultByClientFieldsOptions;

  onChanges(values: string[]) {
    this.getFieldOptions();
  }

  getFieldOptions() {
    const selected = this.form.get('chartDataOptions')?.value[0];

    type OptionActions = {
      [key: string]: () => void;
    };

    const actions: OptionActions = {
      result: () => this.getDefaultFieldOptions(),
      option: () => {
        this.chartFieldsOptions = this.genericFieldsOptions;
        this.form.patchValue({ chartFields: this.chartFieldsOptions[0].value });
      },
    };

    if (actions[selected]) {
      actions[selected]();
    }
  }

  private getDefaultFieldOptions() {
    this.chartFieldsOptions = this.resultByClientFieldsOptions;
    this.form.patchValue({ chartFields: this.chartFieldsOptions[0].value });
  }
}
