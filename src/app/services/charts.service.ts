import { EventEmitter, Injectable } from '@angular/core';
import { FireBirdService } from './firebird.service';
import { DxChartTransformService } from './utils/dx-chart-Transform.service';
import { ChartFilter } from '../pages/lucratividae/utils/chartModels';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  protected destroy$: Subject<void> = new Subject<void>();

  static formEmitter = new EventEmitter();

  static barsChartDataEmitter = new EventEmitter();
  static doughnutChartDataEmitter = new EventEmitter();

  static palette = 'Ocean';
  static paletteExtensionMode = 'Blend';

  constructor(
    private firebirdService: FireBirdService,
    private dxTransform: DxChartTransformService
  ) {}

  getFirebirdData(form: ChartFilter) {
    return this.firebirdService.getChartData(form);
  }

  getChartData(form: ChartFilter) {
    this.getFirebirdData(form)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          const chartData = this.dxTransform.DxTransform(result);
          this.chartDataEmitter(form, chartData);
        },
        error: (error) => console.error(error),
      });
  }

  chartDataEmitter(form: ChartFilter, chartData: any[]) {
    switch (form.chartType) {
      case 'bar':
        ChartsService.barsChartDataEmitter.emit(chartData);
        this.formEmitter(form);
        break;

      case 'stackedBar':
        ChartsService.barsChartDataEmitter.emit(chartData);
        this.formEmitter(form);
        break;

      case 'fullStackedBar':
        ChartsService.barsChartDataEmitter.emit(chartData);
        this.formEmitter(form);
        break;

      case 'doughnut':
        ChartsService.doughnutChartDataEmitter.emit(chartData);
        this.formEmitter(form);
        break;
    }
  }
  formEmitter(form: ChartFilter) {
    ChartsService.formEmitter.emit(form);
  }
}
