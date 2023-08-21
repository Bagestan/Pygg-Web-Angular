import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChartsService } from 'src/app/services/charts.service';
import { FormService } from 'src/app/services/utils/form.service';
import { Router } from '@angular/router';
import { ChartDataType } from './models/chartModels';
import { FireBirdService } from 'src/app/services/firebird.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
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
  ];

  chartTypeOptions = [
    { value: 'bars', label: 'Barras' },
    { value: 'stackedBars', label: 'Barras Combinadas' },
    { value: 'doughnut', label: 'Donut' },
  ];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private formService: FormService,
    private nzMessage: NzMessageService,
    private chartService: ChartsService,
    private router: Router,
    private firebirdService: FireBirdService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: [null, Validators.required],
      chartLimit: [10, Validators.required],
      chartType: ['doughnut', Validators.required],
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

      console.log(chartForm.chartType);
      switch (chartForm.chartType) {
        case 'doughnut': {
          this.chartService.getDoughnutChartData(chartForm);
          this.openChart(chartForm.chartType);
        }
      }

      this.chartService.getBarsChartData(chartForm);
      this.openChart(chartForm.chartType);
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
