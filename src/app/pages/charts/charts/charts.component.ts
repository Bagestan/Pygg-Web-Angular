import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChartsService } from 'src/app/services/charts.service';
import { FormService } from 'src/app/services/utils/form.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  date = null;
  form!: FormGroup;

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
    this.form = this.fb.group({
      date: [null, Validators.required],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.form.controls;
      const chartData = [
        this.formatarData(this.form.get('date')?.value[0]),
        this.formatarData(this.form.get('date')?.value[1]),
      ];
      this.openChart(chartData);
    } else {
      this.nzMessage.warning('Verifique as informações do formulário');
      this.formService.validateAllFormFields(this.form);
    }
  }

  openChart(data: string[]) {
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
