import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChartsService } from 'src/app/services/charts.service';
import { FormService } from 'src/app/services/utils/form.service';
import { Router } from '@angular/router';
import { ChartDataType } from './models/chartModels';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  collapsePanel = true;

  form!: FormGroup;
  chartDataSet!: ChartDataType;

  chartLimitOptions = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
    { label: 40, value: 40 },
    { label: 50, value: 50 },
    { label: 60, value: 60 },
    { label: 70, value: 70 },
    { label: 80, value: 80 },
    { label: 90, value: 90 },
    { label: 100, value: 100 },
    { label: 'Todos', value: 0 },
  ];

  chartTypeOptions = [
    { value: 'bar', label: 'Barras' },
    { value: 'stackedBar', label: 'Barras Combinadas' },
    { value: 'fullStackedBar', label: 'Barras Proporcionais' },
    { value: 'doughnut', label: 'Donut' },
    { value: 'individualDoughnut', label: 'Donut Individual' },
    { value: 'pivotGrid', label: 'pivotGrid' },
  ];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private formService: FormService,
    private nzMessage: NzMessageService,
    private chartService: ChartsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: [null, Validators.required],
      chartLimit: [10, Validators.required],
      chartType: ['pivotGrid', Validators.required],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.form.controls;
      const chartForm = {
        startDate: this.formatarData(this.form.get('date')?.value[0]),
        endDate: this.formatarData(this.form.get('date')?.value[1]),
        maxChartItems: this.form.get('chartLimit')?.value,
        chartType: this.form.get('chartType')?.value,
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

  resetForm(): void {
    this.form.reset();
  }

  formatarData(data: Date): string {
    return this.datePipe.transform(data, 'dd.MM.yyyy') || '';
  }
}
