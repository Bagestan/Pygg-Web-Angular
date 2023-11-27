import { EventEmitter, Injectable } from '@angular/core';
import { DxChartTransformService } from './utils/dx-chart-Transform.service';
import { ChartFilter } from '../pages/lucratividae/utils/chartModels';
import { Subject, takeUntil } from 'rxjs';
import { FirebirdService } from './firebird.service';

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
    private firebird: FirebirdService,
    private dxTransform: DxChartTransformService
  ) {}

  getFirebirdData(form: ChartFilter) {
    return this.firebird.getChartData(form);
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
    const chartTypeEmitterMap = {
      bar: ChartsService.barsChartDataEmitter,
      stackedBar: ChartsService.barsChartDataEmitter,
      fullStackedBar: ChartsService.barsChartDataEmitter,
      doughnut: ChartsService.doughnutChartDataEmitter,
    };

    const emitter = chartTypeEmitterMap[form.chartType];

    if (emitter) {
      emitter.emit(chartData);
      this.formEmitter(form);
    }
  }

  formEmitter(form: ChartFilter) {
    ChartsService.formEmitter.emit(form);
  }
}
