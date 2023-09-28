import { EventEmitter, Injectable } from '@angular/core';
import { ChartFilter } from '../pages/charts/models/chartModels';
import { FireBirdService } from './firebird.service';
import { DxChartTransformService } from './utils/dx-chart-Transform.service';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
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
    this.getFirebirdData(form).subscribe({
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
        break;

      case 'stackedBar':
        ChartsService.barsChartDataEmitter.emit(chartData);
        break;

      case 'fullStackedBar':
        ChartsService.barsChartDataEmitter.emit(chartData);
        break;

      case 'doughnut':
        ChartsService.doughnutChartDataEmitter.emit(chartData);
        break;
    }
  }
}
