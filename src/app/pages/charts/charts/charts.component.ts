import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChartsService } from 'src/app/services/charts.service';
import { FormService } from 'src/app/services/utils/form.service';
import { Router } from '@angular/router';
import { ChartFilter } from '../models/chartModels';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  date = null;
  form!: FormGroup;

  chartLimitOptions = [
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
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.form.controls;
      const chartData: ChartFilter = {
        startDate: this.formatarData(this.form.get('date')?.value[0]),
        endDate: this.formatarData(this.form.get('date')?.value[1]),
        maxChartItems: this.form.get('chartLimit')?.value,
      };

      this.openChart(chartData);
    } else {
      this.nzMessage.warning('Verifique as informações do formulário');
      this.formService.validateAllFormFields(this.form);
    }
  }

  openChart(data: ChartFilter) {
    this.chartService.saveChartData(data);
    this.router.navigate(['main/charts/bars']);
  }

  resetForm(): void {
    this.form.reset();
  }

  formatarData(data: Date): string {
    return this.datePipe.transform(data, 'dd.MM.yyyy') || '';
  }
}
